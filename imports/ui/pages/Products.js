import React from 'react';
import { Link } from 'react-router'
import { Row, Col, Button } from 'react-bootstrap';
import ProductsList from '../containers/ProductsList.js';

const Products = () => (
  <div className="Products">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Products</h4>
          <Link to="/products/new">
            <Button bsStyle="success" className="pull-right">
              New Product
            </Button>
          </Link>
        </div>
        <ProductsList />
      </Col>
    </Row>
  </div>
);

export default Products;
