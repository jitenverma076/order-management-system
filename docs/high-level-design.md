# Order Management System - High Level Design

## Architecture Overview

### System Components
1. **Frontend**: Next.js (App Router, TypeScript)
   - Customer-facing order placement
   - Admin dashboard
   - Real-time order tracking

2. **Backend**: Express.js (REST API)
   - API endpoints for orders, products, customers
   - Authentication & authorization
   - Business logic layer

3. **Database**: PostgreSQL
   - Relational data storage
   - ACID compliance for order processing

4. **Real-time**: WebSockets/SSE
   - Order status updates
   - Admin notifications

## Data Flow

### Order Placement Flow
1. Customer submits order
2. System validates inventory
3. System creates order in PENDING state
4. Inventory is locked
5. Payment is processed
6. Order status updated to PAID
7. Real-time notification sent to admin

### Status Update Flow
1. Admin updates order status
2. System validates transition
3. Database is updated
4. Real-time notification sent to customer

## Database Schema

### Tables
1. `users`
   - id (PK)
   - email (unique)
   - password_hash
   - role (CUSTOMER/ADMIN)
   - created_at
   - updated_at

2. `products`
   - id (PK)
   - name
   - description
   - price (integer, in cents)
   - stock_quantity
   - sku (unique)
   - created_at
   - updated_at

3. `orders`
   - id (PK, UUID)
   - user_id (FK to users)
   - status (PENDING/PAID/FULFILLED/CANCELLED)
   - total_amount (integer, in cents)
   - payment_collected (boolean)
   - shipping_address (JSON)
   - created_at
   - updated_at

4. `order_items`
   - id (PK)
   - order_id (FK to orders)
   - product_id (FK to products)
   - quantity
   - unit_price (integer, in cents)
   - created_at

## API Endpoints

### Public Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order status
- `GET /api/products` - List available products

### Admin Endpoints (Requires ADMIN role)
- `GET /api/admin/orders` - List all orders (with filters)
- `PATCH /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/orders/export` - Export orders as CSV
- `GET /api/admin/products` - Manage products

## Security

### Authentication
- JWT-based authentication
- Secure HTTP-only cookies
- CSRF protection
- Rate limiting

### Authorization
- Role-based access control (RBAC)
- Customer vs Admin roles
- Permission checks on all endpoints

## Real-time Updates
- WebSocket connection for real-time order updates
- Fallback to Server-Sent Events (SSE)
- Event-driven architecture for status changes

## Monitoring & Logging
- Structured logging with Pino
- Error tracking with Sentry
- Health check endpoint at `/healthz`
- Request/Response logging

## Deployment
- Containerized with Docker
- CI/CD pipeline
- Environment-based configuration
- Database backups and monitoring
