import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Carts from '../carts';
import Products from '../../products/products'

Meteor.publish('cart.list', function cart(cartId) {
  check(cartId, String)
  const owner = this.userId;
  const query = owner ? { owner } : { _id: cartId }
  if (cartId || owner) {
    const cart = Carts.findOne(query)
    if (cart) {
      const productIds = cart.products.map((product) => {
        return product.productId
      })
      return [
        Carts.find(query),
        Products.find({ _id: { $in: productIds } })
      ]
    }
  }
  return this.ready()
});
