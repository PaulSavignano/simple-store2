import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import Products from '../../api/products/products'
import CartsList from '../components/CartsList'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('cart');
  if (subscription.ready()) {
    const owner = Meteor.userId();
    const cart = owner ? Carts.findOne({ _id: owner }) : []
    const products = cart.products.map((product) => {
      const productInfo = Products.findOne({ _id: product.productId })
      return {
        id: product.productId,
        qty: product.productQty,
        name: productInfo.name,
        image: productInfo.image,
        price: productInfo.price,
      }
    })
    onData(null, { products })
  }
}

export default composeWithTracker(composer, Loading)(CartsList)


/*
const cartsCursor = Carts.findOne({
  _id: owner
}, {
  fields: {
    'products.productId': 1,
    'products.productQty': 1,
  }
})
console.log(cartsCursor)
const products = cartsCursor.products.map((product) => {
  return [
    product.productQty,
    Products.findOne({ _id: product.productId}, { fields: { name: 1, price: 1 }})
  ]
})
console.log(products)

*/
