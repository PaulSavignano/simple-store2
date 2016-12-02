import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import CartsList from '../components/CartsList'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('carts.list');
  if (subscription.ready()) {
    const owner = Meteor.userId();
    const carts = owner ? Carts.findOne({ _id: owner }) : []
    onData(null, { carts })
  }
}

export default composeWithTracker(composer, Loading)(CartsList)
