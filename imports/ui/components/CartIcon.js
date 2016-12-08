import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem, Badge } from 'react-bootstrap';


const CartIcon = ({ eventKey }) => {
  let total = 0
  const getCart = localStorage.getItem('Cart')
  const parseCart = JSON.parse(getCart)
  const qty = parseCart.map((pro) => {
    return total += pro.productQty
  })
  console.log(total)
  return (
    <LinkContainer to="/cart">
      <NavItem eventKey={ eventKey } href="/cart">
        <i className="fa fa-shopping-cart fa-lg" aria-hidden="true" ></i>
        <Badge>{ total }</Badge>
      </NavItem>
    </LinkContainer>
  )
}

export default CartIcon
