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

Carts.schema = new SimpleSchema({
  productId: {
    type: String,
    label: 'The Id of the cart product',
  },
  productQty: {
    type: String,
    label: 'The quantity of the cart product',
  },
  owner: {
    type: String,
    label: 'The owner of the cart product',
  },
})

Carts.attachSchema(Carts.schema)
