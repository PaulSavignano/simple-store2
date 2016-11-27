import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const handleNav = (_id) => {
  console.log(_id)
  browserHistory.push(`/products/${_id}`)
}

const ProductsList = ({ products }) => (
  products.length > 0 ?
  <ListGroup className="DocumentsList">
    {products.map(({ _id, name }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { name }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No products yet.</Alert>
);

ProductsList.propTypes = {
  products: React.PropTypes.array,
};

export default ProductsList;
