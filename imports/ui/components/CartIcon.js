import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem, Badge } from 'react-bootstrap';


const CartIcon = ({ eventKey }) => {
  return (
    <LinkContainer to="/cart">
      <NavItem eventKey={ eventKey } href="/cart">
        <i className="fa fa-shopping-cart fa-lg" aria-hidden="true" ></i>
        <Badge>1</Badge>
      </NavItem>
    </LinkContainer>
  )
}

export default CartIcon
