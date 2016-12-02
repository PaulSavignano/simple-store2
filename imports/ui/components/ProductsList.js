import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button, Image, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertCart } from '../../api/carts/methods.js';

const handleUpsert = (e) => {
  e.preventDefault()
  const form = e.target
  const productQty = form.children[0]
  console.log(productQty)

    /*const upsert = {
    productId,
    productQty,
  }
  upsertCart.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
      console.log(error)
    } else {
      console.log(response)
      Bert.alert('Product added!', 'success');
    }
  });*/
};

const ProductsList = ({ products }) => {
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
    addToCart: {
      display: 'flex',
      flexFlow: 'row',
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
      {products.map(({ _id, name, image, description, price }) => (
        <ListGroupItem key={ _id } style={ style.container }>
          <Image style={ style.image } src={ image } thumbnail />
          <div style={ style.item }>
            <div style={ style.descContainer }>
              <div>
                <h3>
                  <span style={ style.price }>{ price }</span>
                  <Link to={`/products/${_id}`} style={ style.item }>
                    { name }
                  </Link>
                </h3>
                <p>{ description }</p>
              </div>
              <form onSubmit={ (e) => handleUpsert(e) } style={ style.addToCart }>
                <FormControl type="number" name="qty" style={ style.qty } />
                <Button
                  style={ style.button }
                  bsStyle="success"
                  className="pull-right"
                  type="submit"
                >
                  Add to Cart
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

ProductsList.propTypes = {
  products: React.PropTypes.array,
};

export default ProductsList;
