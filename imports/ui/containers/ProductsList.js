import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Products from '../../api/products/products';
import ProductsList from '../components/ProductsList';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('products.list');
  if (subscription.ready()) {
    const products = Products.find().fetch();
    onData(null, { products });
  }
};

export default composeWithTracker(composer, Loading)(ProductsList);
