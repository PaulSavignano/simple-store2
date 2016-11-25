import React from 'react';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const ProductsList = ({ products }) => (
  products.length > 0 ?
  <ListGroup className="DocumentsList">
    {products.map(({ _id, name }) => (
      <ListGroupItem key={ _id } href={`/products/${_id}`}>{ name }</ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No products yet.</Alert>
);

ProductsList.propTypes = {
  products: React.PropTypes.array,
};

export default ProductsList;
