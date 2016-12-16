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
    const push = {
      products: {
        productId,
        productQty,
      }
    }
    if (this.userId) {
      const owner = this.userId
      if (cart) {
        const productExists = cart.products.find((product) => {
          return product.productId === productId
        })
        if (productExists) {
          return Carts.upsert({ _id: cartId, owner, 'products.productId': productId }, { $inc: { 'products.$.productQty': productQty } })
        } else {
          return Carts.upsert({ _id: cartId, owner }, { $push: push })
        }
      } else {
        const set = {
          owner,
          createdAt: new Date(),
          products: [{
            productId,
            productQty,
          }]
        }
        console.log('no cart no product')
        return Carts.upsert({ _id: cartId }, { $set: set })
      }
    } else {
      if (cart) {
        const productExists = cart.products.find((product) => {
          return product.productId === productId
        })
        if (productExists) {
          return Carts.upsert({ _id: cartId, 'products.productId': productId }, { $inc: { 'products.$.productQty': productQty } })
        } else {
          return Carts.upsert({ _id: cartId }, { $push: push })
        }
      } else {
        const set = {
          createdAt: new Date(),
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
      return Carts.update({ _id: cartId, owner , 'products.productId': productId }, { $set: { 'products.$.productQty': productQty } })
    } else {
      return Carts.update({ _id: cartId, 'products.productId': productId }, { $set: { 'products.$.productQty': productQty } })
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
