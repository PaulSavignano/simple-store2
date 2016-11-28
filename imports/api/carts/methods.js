import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Carts from './carts';
import rateLimit from '../../modules/rate-limit';

export const upsertCart = new ValidatedMethod({
  name: 'carts.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    productId: { type: String, optional: true },
    productQty: { type: String, optional: true },
  }).validator(),
  run(cart) {
    const cartToInsert = cart;
    cartToInsert.owner = this.userId;
    return Carts.upsert({ _id: cart._id }, { $set: cartToInsert })
  },
});

export const removeCart = new ValidatedMethod({
  name: 'carts.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const cartToDelete = Carts.findOne(_id, { fields: { owner: 1 } });
    if (cartToDelete && cartToDelete.owner === this.userId) {
      Carts.remove(_id)
    } else {
      throw new Meteor.Error('500', 'Sorry, that cart is not for you to delete!');
    }
  },
});

rateLimit({
  methods: [
    upsertCart,
    removeCart,
  ],
  limit: 5,
  timeRange: 1000,
});
