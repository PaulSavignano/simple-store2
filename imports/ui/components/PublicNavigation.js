import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, Badge } from 'react-bootstrap';
import CartIcon from '../containers/CartIcon'

const PublicNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/products">
        <NavItem eventKey={ 1 } href="/products">Products</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="signup">
        <NavItem eventKey={ 2 } href="/signup">Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="login">
        <NavItem eventKey={ 3 } href="/login">Log In</NavItem>
      </LinkContainer>
      <CartIcon eventKey={ 4 }/>
    </Nav>
  </div>
);

export default PublicNavigation;
