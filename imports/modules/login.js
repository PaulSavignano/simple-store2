/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';
import { mergeCart } from '../api/carts/methods'

let component;

const login = (localId) => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;
  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Logged in!', 'success');
      Session.set('cartUpdate', 'b')
      const cartId = localStorage.getItem('cartId')
      if (cartId) {
        mergeCart.call({ cartId }, (error, response) => {
          if (error) {
            console.log(error)
          }
        })
      }

      const { location } = component.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

const validate = (localId) => {
  $(component.loginForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Need a password here.',
      },
    },
    submitHandler() { login(localId); },
  });
};

export default function handleLogin(options, localId) {
  component = options.component;
  validate(localId);
}
