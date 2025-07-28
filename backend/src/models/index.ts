import User from './user.model';
import Product from './product.model';
import Order from './order.model';
import OrderItem from './order-item.model';

// User relationships
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order relationships
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Product relationships
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export {
  User,
  Product,
  Order,
  OrderItem,
};
