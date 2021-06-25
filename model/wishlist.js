const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const wishList = new Schema({
    title: { type: String, default: "Cool Wish List" },
    product: [{ type: ObjectId, ref: "Product" }]
});

module.exports = mongoose.model('WishList', wishList);