const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/sellerController');
const buyerController = require('../controllers/buyerController');
const productController = require('../controllers/productController');
const ecoDetailsController = require('../controllers/ecoDetailsController');
const orderController = require('../controllers/orderController');
const orderItemsController = require('../controllers/orderItemsController');
const rewardController = require('../controllers/rewardController');

// Seller Routes
router.post('/sellers', sellerController.createSeller);
router.get('/sellers', sellerController.getAllSellers);
router.get('/sellers/:id', sellerController.getSellerById);
router.put('/sellers/:id', sellerController.updateSeller);
router.delete('/sellers/:id', sellerController.deleteSeller);

// Buyer Routes
router.post('/buyers', buyerController.createBuyer);
router.get('/buyers', buyerController.getAllBuyers);
router.get('/buyers/:id', buyerController.getBuyerById);
router.put('/buyers/:id', buyerController.updateBuyer);
router.delete('/buyers/:id', buyerController.deleteBuyer);

// Product Routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Eco Details Routes
router.post('/eco-details', ecoDetailsController.createEcoDetails);
router.get('/eco-details', ecoDetailsController.getAllEcoDetails);
// router.get('/eco-details/:id', ecoDetailsController.getEcoDetailsByProductId);
router.put('/eco-details/:id', ecoDetailsController.updateEcoDetails);
router.delete('/eco-details/:id', ecoDetailsController.deleteEcoDetails);

// Orders Routes
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

// Order Items Routes
router.post('/order-items', orderItemsController.createOrderItem);
router.get('/order-items/:id', orderItemsController.getOrderItemById);
router.put('/order-items/:id', orderItemsController.updateOrderItem);
router.delete('/order-items/:id', orderItemsController.deleteOrderItem);

// Rewards Routes
router.get('/rewards/:id', rewardController.getRewardByBuyerId);
router.put('/rewards/:id', rewardController.updateReward);
router.delete('/rewards/:id', rewardController.deleteReward);

module.exports = router;
