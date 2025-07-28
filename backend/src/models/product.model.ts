import { Model, DataTypes } from 'sequelize';
import db from '../config/database';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public price!: number;
  public stockQuantity!: number;
  public sku!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'stock_quantity',
    validate: {
      min: 0,
    },
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'products',
  modelName: 'Product',
  timestamps: true,
  underscored: true,
});

export default Product;
