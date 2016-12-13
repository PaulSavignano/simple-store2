import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button, Image, FormControl } from 'react-bootstrap';
import { updateQty, removeCart } from '../../api/carts/methods.js';
import { formatPrice } from '../../modules/format-price'

const handleUpdate = (e, cartId, productId) => {
  e.preventDefault()
  const productQty = parseInt(e.target.value.trim(), 10)
  updateQty.call({ cartId, productId, productQty }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
      console.log(error)
    } else {
      console.log(response)
    }
  })
}

const handleRemove = (e, cartId, productId, productQty) => {
  e.preventDefault()
  removeCart.call({ cartId, productId, productQty }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
      console.log(error)
    } else {
      Bert.alert('Cart deleted!', 'success');
      console.log(response)
    }
  });
};

const CartsList = ({ cartId, products }) => {
  const style = {
    container: {
      display: 'flex',
      flexFlow: 'row wrap',
    },
    item: {
      flex: '1 1 auto',
      alignSelf: 'stretch',
    },
    image: {
      flex: '0 0 auto',
      width: '20%',
      height: '20%',
      minHeight: '20%',
    },
    descContainer: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      height: '100%',
    },
    product: {
      fontSize: 24,
      paddingTop: 8,
    },
    price: {
      float: 'right',
    },
    cartControls: {
      display: 'flex',
      flexFlow: 'row',
      paddingBottom: 3,
    },
    qty: {
      flex: '1 1 50%',
    },
    button: {
      flex: '1 1 50%',
    },
  }
  return (
    <ListGroup>
      {products.map(({ id, name, image, qty, price }) => (
        <ListGroupItem key={ id } style={ style.container }>
          <Image style={ style.image } src={ image } thumbnail />
          <div style={ style.item }>
            <div style={ style.descContainer }>
              <div style={ style.product }>
                <span style={ style.price }>{ formatPrice(price) }</span>
                <Link to={`/products/${id}`} style={ style.name }>
                  { name }
                </Link>
              </div>
              <div style={ style.cartControls }>
                <FormControl
                  onChange={ (e) => handleUpdate(e, cartId, id)}
                  type="number"
                  name="qty"
                  style={ style.qty }
                  defaultValue={ qty }
                />
                <Button
                  onClick={ (e) => handleRemove(e, cartId, id, qty) }
                  style={ style.button }
                  bsStyle="danger"
                  className="pull-right"
                  type="submit"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

CartsList.propTypes = {
  products: React.PropTypes.array,
};

export default CartsList;
