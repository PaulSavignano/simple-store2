import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button, Image } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertCart } from '../../api/carts/methods.js';

const handleUpsert = (productId, productQty) => {
  const upsert = {
    productId,
    productQty,
  }
  upsertCart.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Product added!`, 'success');
    }
  });
};

const ProductsList = ({ products }) => (
  products.length > 0 ?
  <ListGroup>
    {products.map(({ _id, name, image }) => (
      <ListGroupItem key={ _id } className="clearfix">
        <Image src={ image } height="50" width="50" thumbnail/>
        <Link to={`/products/${_id}`}>{ name }</Link>
        <Button
          bsStyle="success"
          className="pull-right"
          onClick={ () => handleUpsert(_id, '1') }
        >
          Add to Cart
        </Button>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No products yet.</Alert>
);

ProductsList.propTypes = {
  products: React.PropTypes.array,
};

export default ProductsList;
