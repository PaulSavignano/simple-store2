import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Random } from 'meteor/random'
import Carts from './carts';
import rateLimit from '../../modules/rate-limit';

export const upsertCart = new ValidatedMethod({
  name: 'carts.upsert',
  validate: new SimpleSchema({
    cartId: { type: String, optional: true, },
    productId: { type: String, optional: true },
    productQty: { type: Number, optional: true },
  }).validator(),
  run({ cartId, productId, productQty }) {
    const cart = Carts.findOne({ _id: cartId })
    const productExists = cart ? cart.products.find((product) => {
      return product.productId === productId
    }) : null
    const push = {
      products: {
        productId,
        productQty,
      }
    }
    if (this.userId) {
      const owner = this.userId
      if (cart) {
        if (productExists) {
          return Carts.upsert({ _id: cartId, owner, 'products.productId': productId }, { $inc: { total: productQty, 'products.$.productQty': productQty } })
        } else {
          return Carts.upsert({ _id: cartId, owner }, { $inc: { total: productQty }, $push: push })
        }
      } else {
        const set = {
          owner,
          createdAt: new Date(),
          total: productQty,
          products: [{
            productId,
            productQty,
          }]
        }
        return Carts.upsert({ _id: cartId }, { $set: set })
      }
    } else {
      if (cart) {
        if (productExists) {
          return Carts.upsert({ _id: cartId, 'products.productId': productId }, { $inc: { total: productQty, 'products.$.productQty': productQty } })
        } else {
          return Carts.upsert({ _id: cartId }, { $inc: { total: productQty }, $push: push })
        }
      } else {
        const set = {
          createdAt: new Date(),
          total: productQty,
          products: [{
            productId,
            productQty,
          }]
        }
        return Carts.upsert({ _id: cartId }, { $set: set })
      }
    }
  }
});

export const updateQty = new ValidatedMethod({
  name: 'carts.qty',
  validate: new SimpleSchema({
    cartId: { type: String, optional: true },
    productId: { type: String, optional: true },
    productQty: { type: Number, optional: true },
  }).validator(),
  run({ cartId, productId, productQty }) {
    if (this.userId) {
      const owner = this.userId
      return Carts.update({ _id: cartId, owner , 'products.productId': productId }, { $set: { 'products.$.productQty': productQty }, $inc: { total: productQty } })
    } else {
      return Carts.update({ _id: cartId, 'products.productId': productId }, { $set: { 'products.$.productQty': productQty }, $inc: { total: productQty } })
    }
  }
})

export const removeCart = new ValidatedMethod({
  name: 'carts.remove',
  validate: new SimpleSchema({
    cartId: { type: String },
    productId: { type: String },
    productQty: { type: Number },
  }).validator(),
  run({ cartId, productId, productQty }) {
    const pull = {
      products: {
        productId,
        productQty,
      }
    }
    if (this.userId) {
      const owner = this.userId
      return Carts.update({ _id: cartId, owner }, { $pull: pull }, (error, response) => {
        if (response) {
          if (Carts.findOne({ _id: cartId, owner }).products.length === 0) {
            return Carts.remove({ _id: cartId, owner })
          }
        }
      })
    } else {
      return Carts.update({ _id: cartId }, { $pull: pull }, (error, response) => {
        if (response) {
          if (Carts.findOne({ _id: cartId }).products.length === 0) {
            return Carts.remove({ _id: cartId })
          }
        }
      })
    }
  },
});

export const mergeCart = new ValidatedMethod({
  name: 'carts.merge',
  validate: new SimpleSchema({
    cartId: { type: String },
  }).validator(),
  run({ cartId }) {
    if (this.userId) {
      const owner = this.userId
      const localCart = Carts.findOne({ _id: cartId })
      const userCart = Carts.findOne({ owner })
      if (localCart) {
        if (userCart) {
          return Carts.upsert({ _id: cartId, owner }, { $addToSet: localCart.products}, (error, response) => {
            if (error) {
              console.log(error)
            } else {
              console.log(response)
            }
          })
        } else {
          const set = {
            owner,
            products: localCart.products
          }
          return Carts.upsert({ _id: cartId }, { $set: set })
        }
      }
    }
  }
})

rateLimit({
  methods: [
    upsertCart,
    removeCart,
  ],
  limit: 5,
  timeRange: 1000,
});
