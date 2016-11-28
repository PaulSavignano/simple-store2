import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import { removeCart } from '../../api/carts/methods.js';


const handleRemove = (_id) => {
  removeCart.call({ _id }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Cart deleted!', 'success');
    }
  });
};

const CartsList = ({ carts }) => (
  carts.length > 0 ? <ListGroup className="CartsList">
    {carts.map(({ _id, productId }) => (
      <ListGroupItem key={ _id } className="clearfix">
        <Link to={`/products/${productId}`}>{ productId }</Link>
        <Button
          bsStyle="danger"
          className="pull-right"
          onClick={ () => handleRemove(_id) }
        >
          Remove
        </Button>
      </ListGroupItem>    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No carts yet.</Alert>
);

CartsList.propTypes = {
  carts: React.PropTypes.array,
};

export default CartsList;
