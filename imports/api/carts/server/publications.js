import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Carts from '../carts';

Meteor.publish('carts.list', function cartsList() {
  const owner = this.userId;
  if (owner) return Carts.find({ owner });
  return this.ready();
});

Meteor.publish('carts.view', function cartsView(_id) {
  check(_id, String);
  const owner = this.userId;
  if (owner) return Carts.find({ _id, owner });
  return this.ready();
});
