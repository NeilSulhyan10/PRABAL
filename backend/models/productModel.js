const axios = require('axios');
const db = require('../db');

const Product = {
  create: (data, callback) => {
    axios.post('https://api.gemini.com/eco-rating', {
      description: data.description
    }, {
      headers: {
        'Authorization': 'Bearer AIzaSyCmBgm4CpDVd56b-GWj0gg0L_VhmOEhtvY'
      }
    })
    .then(response => {
      const ecoRating = response.data.ecoRating;

      const sql = `
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      const values = [
        data.sellerId,
        data.name,
        data.shortDescription,
        data.description,
        data.price,
        data.quantity,
        data.image,
        ecoRating,
        data.isRecyclable,
        data.isBiodegradable,
        data.isReusable,
        data.usesOrganicMaterials,
        data.carbonFootprintScore,
        data.isPlasticPackaging,
        data.isCertified,
        data.certificationUrls,
        data.durability
      ];

      db.query(sql, values, callback);
    })
    .catch(error => {
      console.error("Error calling Gemini API:", error);
      callback(error);
    });
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM products WHERE product_id = ?', [id], callback);
  }
};

module.exports = Product;