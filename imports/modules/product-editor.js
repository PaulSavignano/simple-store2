/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertProduct } from '../api/products/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { product } = component.props;
  const confirmation = product && product._id ? 'Product updated!' : 'Product added!';
  console.log(document.querySelector('[name="description"]'))
  const upsert = {
    description: document.querySelector('[name="description"]').value.trim(),
    name: document.querySelector('[name="name"]').value.trim(),
    price: document.querySelector('[name="price"]').value.trim(),
  };

  if (product && product._id) upsert._id = product._id;

  upsertProduct.call(upsert, (error, { insertedId }) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.productEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/products/${insertedId || product._id}`);
    }
  });
};

const validate = () => {
  $(component.productEditorForm).validate({
    rules: {
      description: {
        required: true,
      },
      name: {
        required: true,
      },
      price: {
        required: true,
      },
    },
    messages: {
      description: {
        required: 'Need a description in here.',
      },
      name: {
        required: 'Need a name in here.',
      },
      price: {
        required: 'Need a price for the product.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function productEditor(options) {
  component = options.component;
  console.log(component)
  validate();
}
