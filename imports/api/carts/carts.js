import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Carts = new Mongo.Collection('Carts');
export default Carts;

Carts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Carts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
