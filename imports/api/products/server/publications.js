import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Products from '../products';

Meteor.publish('products.list', () => Products.find());

Meteor.publish('products.view', (_id) => {
  check(_id, String);
  return Products.find(_id);
});
