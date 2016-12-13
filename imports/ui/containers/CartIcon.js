import { composeWithTracker } from 'react-komposer';
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import CartIcon from '../components/CartIcon'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const sessionId = Session.get('cartId')
  const localId = localStorage.getItem('cartId')
  const cartId = sessionId ? sessionId : localId
  const subscription = Meteor.subscribe('cart.list', cartId);
  if (subscription.ready()) {
    let quantity = 0
    const query = Meteor.userId() ? { owner: Meteor.userId() } : { _id: cartId }
    const cart =  Carts.findOne(query)
    console.log(cart)
    cart ? cart.products.map((cartProduct) => {
      quantity += cartProduct.productQty
    }) : []
    onData(null, { quantity })
  }
}

export default composeWithTracker(composer, Loading)(CartIcon)
