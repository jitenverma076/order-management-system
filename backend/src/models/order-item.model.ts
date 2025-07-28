import { Model, DataTypes } from 'sequelize';
import db from '../config/database';
import Order from './order.model';
import Product from './product.model';

class OrderItem extends Model {
  public id!: number;
  public orderId!: string;
  public productId!: number;
  public quantity!: number;
  public unitPrice!: number;
  public readonly createdAt!: Date;
}

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'order_id',
    references: {
      model: Order,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id',
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  unitPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'unit_price',
    validate: {
      min: 0,
    },
  },
}, {
  sequelize: db,
  tableName: 'order_items',
  modelName: 'OrderItem',
  timestamps: true,
  underscored: true,
  createdAt: true,
  updatedAt: false,
});

export default OrderItem;
