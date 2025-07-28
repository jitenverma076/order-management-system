import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import WebSocket from 'ws';
import { pinoHttp } from 'pino-http';
import rateLimit from 'express-rate-limit';
import db from './config/database';
import { User, Product, Order, OrderItem } from './models';

const app = express();
const httpServer = createServer(app);
const wss = new WebSocket.Server({ server: httpServer });

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
  ws.send('Connected to Order Management System');
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection and server startup
const PORT = process.env.PORT || 3001;

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync({ alter: true });
  })
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

export { app, httpServer, wss };
