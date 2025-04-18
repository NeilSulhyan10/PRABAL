const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

// Set up storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
}).single('product_image');

// Create Product
exports.createProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    try {
      const {
        product_seller_id,
        product_name,
        product_short_description,
        product_description,
        product_price,
        product_stock_quantity,
        is_recyclable,
        is_biodegradable,
        is_reusable,
        uses_organic_materials,
        carbon_footprint_score,
        is_plastic_packaging,
        is_certified,
        certification_urls,
        durability
      } = req.body;

      const product_image_url = req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : null;

      // Call Gemini API for eco rating
      const geminiRes = await axios.post(
        'https://api.gemini.com/eco-rating',
        { description: product_description },
        {
          headers: {
            Authorization: 'Bearer AIzaSyCmBgm4CpDVd56b-GWj0gg0L_VhmOEhtvY',
          },
        }
      );

      const product_eco_rating = geminiRes.data.ecoRating;

      const query = `
        INSERT INTO products (
          product_seller_id,
          product_name,
          product_short_description,
          product_description,
          product_price,
          product_stock_quantity,
          product_image_url,
          product_eco_rating,
          is_recyclable,
          is_biodegradable,
          is_reusable,
          uses_organic_materials,
          carbon_footprint_score,
          is_plastic_packaging,
          is_certified,
          certification_urls,
          durability,
          product_created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      const values = [
        product_seller_id,
        product_name,
        product_short_description,
        product_description,
        product_price,
        product_stock_quantity,
        product_image_url,
        product_eco_rating,
        is_recyclable === 'true',
        is_biodegradable === 'true',
        is_reusable === 'true',
        uses_organic_materials === 'true',
        parseFloat(carbon_footprint_score),
        is_plastic_packaging === 'true',
        is_certified === 'true',
        certification_urls,
        durability
      ];

      db.query(query, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ product_id: result.insertId });
      });
    } catch (error) {
      console.error("Gemini API Error:", error.message);
      return res.status(500).send({ message: "Error generating eco rating." });
    }
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE product_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE products SET ? WHERE product_id = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Product updated successfully');
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE product_id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Product deleted successfully');
  });
};