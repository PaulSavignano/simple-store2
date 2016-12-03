import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Carts from '../carts';
import Products from '../../products/products'

Meteor.publish('cart', function cart() {
  const owner = this.userId;
  if (owner) {
    const cart = Carts.findOne({ _id: owner })
    const productIds = cart.products.map((product) => {
      return product.productId
    })
    return [
      Carts.find({_id: owner}),
      Products.find({ _id: { $in: productIds } })
    ]
  }
  return this.ready();
});




/*  .products.map((pro) => {
  console.log(pro)
  return pro.productId */
