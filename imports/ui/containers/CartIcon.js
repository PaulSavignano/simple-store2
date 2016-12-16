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
  let quantity = 0
  if (subscription.ready()) {
    const query = Meteor.userId() ? { owner: Meteor.userId() } : { _id: cartId }
    if (query) {
      const cart =  Carts.findOne(query)
      cart ? cart.products.map((cartProduct) => {
        quantity += cartProduct.productQty
      }) : []
    }
  }
  console.log(quantity)
  onData(null, { quantity })
}

export default composeWithTracker(composer, Loading)(CartIcon)
