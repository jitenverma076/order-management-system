import { Model, DataTypes } from 'sequelize';
import db from '../config/database';
import User from './user.model';

class Order extends Model {
  public id!: string;
  public userId!: number;
  public status!: 'PENDING' | 'PAID' | 'FULFILLED' | 'CANCELLED';
  public totalAmount!: number;
  public paymentCollected!: boolean;
  public shippingAddress!: Record<string, any>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'PAID', 'FULFILLED', 'CANCELLED'),
    defaultValue: 'PENDING',
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'total_amount',
    validate: {
      min: 0,
    },
  },
  paymentCollected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'payment_collected',
  },
  shippingAddress: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'shipping_address',
  },
}, {
  sequelize: db,
  tableName: 'orders',
  modelName: 'Order',
  timestamps: true,
  underscored: true,
});

export default Order;
