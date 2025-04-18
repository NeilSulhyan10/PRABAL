const db = require('../config/db');

exports.createProduct = (req, res) => {
  const { product_seller_id, product_name, product_description, product_price, product_stock_quantity, product_image_url, product_eco_rating } = req.body;
  const query = `INSERT INTO products (product_seller_id, product_name, product_description, product_price, product_stock_quantity, product_image_url, product_eco_rating)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [product_seller_id, product_name, product_description, product_price, product_stock_quantity, product_image_url, product_eco_rating], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ product_id: result.insertId });
  });
};

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE product_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE products SET ? WHERE product_id = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Product updated successfully');
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE product_id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Product deleted successfully');
  });
};