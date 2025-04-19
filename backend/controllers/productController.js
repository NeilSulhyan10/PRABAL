const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
const Product = require("../models/productModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
}).single("product_image");

exports.createProduct = async (req, res) => {
  try {
    const {
      seller_id,
      product_name,
      product_short_description,
      product_description,
      product_price,
      product_stock_quantity,
      product_image_url,
      is_recyclable,
      is_biodegradable,
      is_reusable,
      uses_organic_materials,
      is_plastic_packaging,
      is_certified,
      certification_urls,
      durability,
    } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const ecoRatingPrompt = `Based on the following product description, classify its eco rating as "High", "Moderate", or "Low":
    Description: ${product_description}
    Respond with only one word: High, Moderate, or Low.`;

    const carbonFootprintPrompt = `Based on the following product description or product name, estimate the carbon footprint score of the product on a scale of 1-10 (with 1 being low and 10 being high):
    Name: ${product_name}
    Description: ${product_description}
    Respond with only a number between 1 and 10.`;

    const ecoRatingResult = await model.generateContent(ecoRatingPrompt);
    const ecoRatingResponse = await ecoRatingResult.response;
    let ecoRating = ecoRatingResponse.text().trim();

    ecoRating = ecoRating.charAt(0).toUpperCase() + ecoRating.slice(1).toLowerCase();

    const carbonFootprintResult = await model.generateContent(carbonFootprintPrompt);
    const carbonFootprintResponse = await carbonFootprintResult.response;
    let carbonFootprintScore = carbonFootprintResponse.text().trim();

    carbonFootprintScore = parseFloat(carbonFootprintScore);

    const productData = {
      seller_id,
      product_name,
      product_short_description,
      product_description,
      product_price,
      product_stock_quantity,
      product_image_url: JSON.stringify(product_image_url), // Stringify the array
      product_eco_rating: ecoRating,
      is_recyclable,
      is_biodegradable,
      is_reusable,
      uses_organic_materials,
      carbon_footprint_score: carbonFootprintScore,
      is_plastic_packaging,
      is_certified,
      certification_urls: JSON.stringify(certification_urls), // Stringify the array
      durability,
    };

    Product.create(productData, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create product", error: err.message });
      }

      res.status(201).json({
        message: "Product created successfully",
        productId: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate eco rating or create product", error: error.message });
  }
};


// Get all products
exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0]);
    }
  );
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query("UPDATE products SET ? WHERE product_id = ?", [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Product updated successfully");
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE product_id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Product deleted successfully");
  });
};
