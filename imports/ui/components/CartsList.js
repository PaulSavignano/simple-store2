import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button, Image, FormControl } from 'react-bootstrap';
import { removeCart } from '../../api/carts/methods.js';


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

const CartsList = ({ carts }) => {
  console.log(carts)
  const style = {
    container: {
      display: 'flex',
      flexFlow: 'row wrap',
    },
    image: {
      flex: '0 1 auto',
    },
    item: {
      flex: '1 1 auto',
      alignSelf: 'stretch',
    },
    descContainer: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      height: '100%',
    },
    price: {
      float: 'right',
    },
  }
  return (
    carts ?
    <ListGroup>
      {carts.products.map(({ productId, productQty }) => (
          <ListGroupItem key={ productId } style={ style.container }>
            <Image style={ style.image } src="" thumbnail />
            <div style={ style.item }>
              <div style={ style.descContainer }>
                <div>
                  <h3>
                    <span style={ style.price }>{ productQty }</span>
                    <Link to={`/products/${productId}`} style={ style.item }>
                      { productId }
                    </Link>
                  </h3>
                  <p>{ productId }</p>
                </div>
                <div>
                  <span>
                    <FormControl type="number"/>
                  </span>
                  <Button
                    style={ style.button }
                    bsStyle="danger"
                    className="pull-right"
                    onClick={ () => handleRemove(productId, productQty) }
                  >
                    Remove
                  </Button>
                </div>

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
