import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeProduct } from '../../api/products/methods.js';

const handleNav = (_id) => {
  browserHistory.push(`/products/${_id}/edit`);
}

const handleRemove = (_id) => {
  removeProduct.call({ _id }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Product deleted!', 'success');
      browserHistory.push('/products');
    }
  });
};

const ProductView = ({ product }) => (
  <div className="ProductView">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ product.name }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={ () => handleNav(product._id) }>Edit</Button>
          <Button onClick={ () => handleRemove(product._id) } className="text-danger">Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { product.description }
    { product.price }
  </div>
);

ProductView.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default ProductView;
