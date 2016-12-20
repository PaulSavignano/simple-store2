import { composeWithTracker } from 'react-komposer';
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import CartIcon from '../components/CartIcon'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const cartUpdate = Session.get('cartUpdate')
  const localCart = localStorage.getItem('cartId')
  const cartId = cartUpdate ? localCart : null
  if (cartId) {
    const subscription = Meteor.subscribe('cart.list', cartId);
    if (subscription.ready()) {
      const query = Meteor.userId() ? { owner: Meteor.userId() } : { _id: cartId }
      const cart = Carts.findOne(query)
      console.log(cart)
      const total = cart ? cart.total : 0
      onData(null, { total })
    }
  } else {
    onData(null, { total: 0 })
  }
}

export default composeWithTracker(composer, Loading)(CartIcon)
