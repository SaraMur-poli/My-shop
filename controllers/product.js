const productModel = require('../models/productModel');

async function register(req, res){
    try {
      const { name, category, price, stock} = req.body;
  
      const existingName = await productModel.findOne({ name });
          if (existingName) {
              return res.status(400).json({ error: 'The name is already in use.' });
        }
  
      const newProduct = new productModel({ name, category, price, stock});
      await newProduct.save();
      res.status(201).json({ message: 'Successfully registered product' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering the product', error });
      console.error('Error registering the product', error);
    }
  
  };
  
  
  module.exports = {
      register,
  };