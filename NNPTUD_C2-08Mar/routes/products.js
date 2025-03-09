// routes/products.js
var express = require('express');
var router = express.Router();
let Product = require('../models/products');

// Lấy danh sách sản phẩm không bị xóa
router.get('/', async function(req, res, next) {
    try {
        let products = await Product.find({ isDeleted: false });
        res.send(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tạo sản phẩm mới
router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newProduct = new Product({
            productName: body.productName,
            price: body.price,
            quantity: body.quantity,
            categoryID: body.category
        });
        await newProduct.save();
        res.send(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Xóa mềm sản phẩm (Cập nhật isDeleted = true)
router.delete('/:id', async function(req, res, next) {
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
