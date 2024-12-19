const express = require('express');
const router = express.Router();

const Controller = require('../controllers/product');

router.post('/register', Controller.register);

router.get('/showProducts', Controller.showProducts);

router.get('/getProduct/:id', Controller.getProduct);

router.post('/editProduct', Controller.editProduct); 

router.delete('/deleteProduct/:id', Controller.deleteProduct);





module.exports = router;