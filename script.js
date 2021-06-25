const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import files 
const Product = require('./model/products');
const WishList = require('./model/wishlist');

// DB 
const db = mongoose.connect('mongodb://localhost/swag-Shop', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes 
app.get('/', (req, res) => {
    res.send('Swap-Swag API')
})
// get product from the client 
app.post('/product', (req, res) => {
    const product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.save((err, savedProduct) => {
        if (err) {
            res.status(500).send({ error: "Could not save Product" })
        } else {
            res.send(savedProduct)
        }
    });
});

// get products 
app.get('/product', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).send({ error: "Product not found" })
        } else {
            res.send(products)
        }
    });
});


// default port 
app.listen(3000, () => console.log('Server Started!'));