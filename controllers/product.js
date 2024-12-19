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

  const showProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        console.log(products);
        return res.render('products', {products})
    } catch (error) {
        return res.status(500).send('Error showing products');
    }
  };
  
  const getProduct = async (req, res) => {
    try {
        const productId = req.params.id; 
        const product = await productModel.findById(productId); 

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.json(product); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching product');
    }
};


// Controlador para editar el producto
const editProduct = async (req, res) => {
  const { idUpdate, nameUpdate, priceUpdate, categoryUpdate, stockUpdate } = req.body;

  try {
      // Buscar el producto por su ID
      const product = await productModel.findById(idUpdate);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      // Actualizar el producto
      product.name = nameUpdate;
      product.price = priceUpdate;
      product.category = categoryUpdate;
      product.stock = stockUpdate;

      await product.save(); // Guardar los cambios

      return res.status(200).json({
          message: 'Product updated successfully'
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          error: 'Error updating product',
          message: error.message
      });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = {
    register,
    showProducts,
    getProduct,
    editProduct,
    deleteProduct
};