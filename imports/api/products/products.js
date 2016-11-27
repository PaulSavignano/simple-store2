import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Products = new Mongo.Collection('Products');
export default Products;

Products.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Products.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Products.schema = new SimpleSchema({
  description: {
    type: String,
    label: 'The description of the product',
  },
  image: {
    type: String,
    label: 'The image of the product',
  },
  name: {
    type: String,
    label: 'The name of the product',
  },
  price: {
    type: String,
    label: 'The price of the product',
  },
})

Products.attachSchema(Products.schema)
