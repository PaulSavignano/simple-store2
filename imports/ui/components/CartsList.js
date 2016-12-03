import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button, Image, FormControl } from 'react-bootstrap';
import { removeCart } from '../../api/carts/methods.js';
import { formatPrice } from '../../modules/format-price'


const handleRemove = (productId, productQty) => {
  removeCart.call({ productId, productQty }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
      console.log(error)
    } else {
      Bert.alert('Cart deleted!', 'success');
      console.log(response)
    }
  });
};

const CartsList = ({ products }) => {
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
    addToCart: {
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
    products.length > 0 ?
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
              <form onSubmit={ (e) => handleUpsert(e, id) } style={ style.addToCart }>
                <FormControl type="number" name="qty" style={ style.qty } defaultValue="1" />
                <Button
                  style={ style.button }
                  bsStyle="danger"
                  className="pull-right"
                  type="submit"
                >
                  Remove
                </Button>
              </form>

            </div>
          </div>

        </ListGroupItem>
      ))}
    </ListGroup> :
    <Alert bsStyle="warning">No products yet.</Alert>
  )
}
/*
CartsList.propTypes = {
  carts: React.PropTypes.object,
};
*/
export default CartsList;
