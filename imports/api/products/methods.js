import Products from './products';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../modules/rate-limit';

export const upsertProduct = new ValidatedMethod({
  name: 'products.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    description: { type: String, optional: true },
    image: { type: String, optional: true },
    name: { type: String, optional: true },
    price: { type: String, optional: true },
  }).validator(),
  run(product) {
    return Products.upsert({ _id: product._id }, { $set: product })
  },
});

export const removeProduct = new ValidatedMethod({
  name: 'products.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Products.remove(_id)
  }
});

rateLimit({
  methods: [
    upsertProduct,
    removeProduct,
  ],
  limit: 5,
  timeRange: 1000,
});
