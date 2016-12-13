import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import Products from '../../api/products/products'
import Cart from '../pages/Cart'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const cartId = localStorage.getItem('cartId')
  const subscription = Meteor.subscribe('cart.list', cartId);
  if (subscription.ready()) {
    let total = 0
    let quantity = 0
    const query = Meteor.userId() ? { owner: Meteor.userId() } : { _id: cartId }
    const cart =  Carts.findOne(query)
    const productsCol = Products.find().fetch()
    const products = cart ? cart.products.map((cartProduct) => {
      const product = productsCol.find((pro) => {
        return pro._id === cartProduct.productId
      })
      quantity += cartProduct.productQty
      total += cartProduct.productQty * product.price
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
