import React from 'react';
import { Link } from 'react-router'
import { Row, Col, Button } from 'react-bootstrap';
import CartsList from '../containers/CartsList.js';

const Carts = () => (
  <div className="Carts">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Cart</h4>
        </div>
        <CartsList />
      </Col>
    </Row>
  </div>
);

export default Carts;
