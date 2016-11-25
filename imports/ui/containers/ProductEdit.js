import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Products from '../../api/products/products';
import ProductEdit from '../pages/ProductEdit';
import Loading from '../components/Loading';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('products.view', params._id);
  if (subscription.ready()) {
    const product = Products.findOne();
    onData(null, { product });
  }
};

export default composeWithTracker(composer, Loading)(ProductEdit);
