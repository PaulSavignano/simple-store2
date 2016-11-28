import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Carts from '../../api/carts/carts'
import CartsList from '../components/CartsList'
import Loading from '../components/Loading'

const composer = (params, onData) => {
  const cartsSub = Meteor.subscribe('carts.list');
  const productsSub = Meteor.subscribe('products.list')
  if (cartsSub.ready() && productsSub.ready()) {
    const owner = Meteor.userId();
    const carts = owner ? Carts.find({ owner }).fetch() : [];
    onData(null, { carts })
  }
}

export default composeWithTracker(composer, Loading)(CartsList)
