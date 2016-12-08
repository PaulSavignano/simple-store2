import React from 'react';
import { Link } from 'react-router'
import { Row, Col, Button } from 'react-bootstrap';
import CartsList from '../components/CartsList.js';
import { formatPrice } from '../../modules/format-price'

const style = {
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
  },
}

const Cart = ({ cartId, products, total, quantity }) => {
  console.log(cartId)
  return (
    <div className="Carts">
      <Row>
        <Col xs={ 12 }>
          <div className="page-header clearfix">
            <h4 className="pull-left">Cart</h4>
            <h4 className="pull-right">{ formatPrice(total) }</h4>
          </div>
          <CartsList products={ products } />
          <div style={ style.container }>
            <p>Subtotal ({ quantity } items):</p>
            <p>{ formatPrice(total) }</p>
          </div>
          <div style={ style.container }>
            <p>Shipping:</p>
            <p>$0.00</p>
          </div>
          <div style={ style.container }>
            <p>Tax:</p>
            <p>7.5%</p>
          </div>
          <hr/>
          <div style={ style.container }>
            <h4>Total:</h4>
            <h4>{ formatPrice(total)}</h4>
          </div>
          <br/>
          <Button style={ style.button } bsStyle="success">Check Out</Button>
        </Col>
      </Row>
    </div>
  )
};

export default Cart;
