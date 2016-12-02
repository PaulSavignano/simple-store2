import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Carts from './carts';
import rateLimit from '../../modules/rate-limit';

export const upsertCart = new ValidatedMethod({
  name: 'carts.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    cartId: { type: String, optional: true },
    productId: { type: String, optional: true },
    productQty: { type: Number, optional: true },
  }).validator(),
  run(cart) {
    const cartToInsert = cart;
    cartToInsert.owner = this.userId;
    const { owner, productId, productQty } = cartToInsert;
    const productExists = Carts.findOne({ _id: owner, 'products.productId': productId })

    if (productExists) {
      return Carts.upsert({ _id: owner, 'products.productId': productId }, { $inc: { 'products.$.productQty': 1 }})
    } else {
      const product = {
        products: {
          productId: productId,
          productQty: productQty,
        }
      }
      return Carts.upsert({ _id: owner }, { $push: product })
    }
  },
});

export const removeCart = new ValidatedMethod({
  name: 'carts.remove',
  validate: new SimpleSchema({
    productId: { type: String },
    productQty: { type: Number },
  }).validator(),
  run({ productId, productQty }) {
    const owner = this.userId
    const cartToDelete = Carts.findOne({ _id: owner, 'products.productId': productId });
    const pull = {
      products: {
        productId,
        productQty,
      }
    }
    if (cartToDelete && owner) {
      return Carts.update({ _id: owner }, { $pull: pull }, (error, response) => {
        if (response) {
          const cartsRemaining = Carts.findOne({ _id: owner})
          if (cartsRemaining.products.length === 0) {
            return Carts.remove({ _id: owner })
          }
        }
      })
    } else if(!owner) {
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
