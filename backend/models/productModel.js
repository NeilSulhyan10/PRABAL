const db = require('../db');

const Product = {
  create: (data, callback) => {
    const sql = 'INSERT INTO products (product_seller_id, product_name, product_description, product_price, product_stock_quantity, product_image_url, product_eco_rating) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [data.sellerId, data.name, data.description, data.price, data.quantity, data.image, data.ecoRating], callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM products WHERE product_id = ?', [id], callback);
  }
};

module.exports = Product;