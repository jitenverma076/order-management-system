import { Model, DataTypes } from 'sequelize';
import db from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public role!: 'CUSTOMER' | 'ADMIN';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password_hash',
  },
  role: {
    type: DataTypes.ENUM('CUSTOMER', 'ADMIN'),
    defaultValue: 'CUSTOMER',
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  underscored: true,
});

export default User;
