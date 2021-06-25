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

// default -- routes 
app.get('/', (req, res) => {
    res.send('Swap-Swag API')
})

// PRODUCTS 
// create product 
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


// WISHLIST 
// create whishList 
app.post('/wishlist', (req, res) => {
    const wishList = new WishList();
    wishList.title = req.body.title;

    wishList.save((err, newWishList) => {
        if (err) {
            res.status(500).send({ error: "Could not create wishList" })
        } else {
            res.send(newWishList)
        }
    })
})

app.put('/wishlist/product/add', (req, res) => {
    // find product in the db 
    Product.findOne({ _id: req.body.productId }, (err, product) => {
        if (err) {
            res.status(500).send({ error: "Product with given ID not found" })
        } else {
            WishList.update({ _id: req.body.wishListId }, { $addToSet: { products: product._id } }, (err, wishList) => {
                if (err) {
                    res.status(500).send({ error: "Product Not found" })
                } else {
                    res.send('Successfuly added to wishList')
                }
            })
        }
    })
})

//get list of WishList
app.get('/wishlist', (req, res) => {
    WishList.find({}).populate({ path: 'products', model: 'Product' }).exec((err, wishLists) => {
        if (err) {
            res.status(500).send({ error: 'Could not fetch WishList' })
        } else {
            res.send(wishLists)
        }
    })
})

// default port 
app.listen(3000, () => console.log('Server Started!'));