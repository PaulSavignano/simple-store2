import React from 'react'
import { Session } from 'meteor/session'
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Button, Image, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertCart } from '../../api/carts/methods'
import { formatPrice } from '../../modules/format-price'

const handleUpsert = (e, productId) => {
  e.preventDefault()
  const cartId = localStorage.getItem('cartId') ? localStorage.getItem('cartId') : null
  const form = e.target
  const productQty = parseInt(form.querySelector('[name="qty"]').value, 10)
  const upsert = {
    cartId,
    productId,
    productQty,
  }
  upsertCart.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
      console.log(error)
    } else {
      console.log(response)
      Session.set('cartId', response.insertedId)
      if (response.insertedId) {
        localStorage.setItem('cartId', response.insertedId)
      }
      Bert.alert('Product added!', 'success');
    }
  })
}

const ProductsList = ({ products }) => {
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
                <div style={ style.product }>
                  <span style={ style.price }>{ formatPrice(price) }</span>
                  <Link to={`/products/${_id}`} style={ style.item }>
                    { name }
                  </Link>
                </div>
                <p>{ description }</p>
              </div>
              <form onSubmit={ (e) => handleUpsert(e, _id) } style={ style.addToCart }>
                <FormControl type="number" name="qty" style={ style.qty } defaultValue="1" />
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
