import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import Products from '../../api/products/products'
import Cart from '../pages/Cart'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('cart');
  if (subscription.ready()) {
    let total = 0
    let quantity = 0
    const owner = Meteor.userId()
    const productsCol = owner ? Products.find().fetch() : []
    const carts = owner ? Carts.findOne({ _id: owner }) : []
    const cartId = carts ? carts.cartId : {}
    const products = carts ? carts.products.map((cartProduct) => {
      const id = cartProduct.productId
      const qty = cartProduct.productQty
      const product = productsCol.find((pro) => {
        return pro._id === id
      })
      total += qty * product.price
      quantity += qty
      return {
        _id: product._id,
        id: cartProduct.productId,
        qty: cartProduct.productQty,
        name: product.name,
        image: product.image,
        price: product.price,
      }
    }) : []
    onData(null, { cartId, products, total, quantity })
  }
}

export default composeWithTracker(composer, Loading)(Cart)


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
