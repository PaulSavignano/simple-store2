import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import productEditor from '../../modules/product-editor'
import ProductImageEdit from './ProductImageEdit'

export default class ProductEditor extends React.Component {
  componentDidMount() {
    productEditor({ component: this });
    setTimeout(() => {
      document.querySelector('[name="name"]').focus(); }, 0);
  }
  render() {
    const { product } = this.props;
    let imageSrc = {};
    if (product) {
      imageSrc = product.image;
    } else {
      imageSrc = '/image-500x500.png';
    }
    return (
      <form
        ref={ form => (this.productEditorForm = form ) }
        onSubmit={ event => event.preventDefault() }
      >
        <Row>
          <Col xs={ 6 } sm={ 6 }>
            <ProductImageEdit image={ imageSrc }/>
          </Col>
          <Col xs={ 6 } sm={ 6 }>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                defaultValue={ product && product.name }
                placeholder="Enter a product name."
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                name="desc"
                componentClass="textarea"
                defaultValue={ product && product.description }
                placeholder="Enter a product description."
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Price</ControlLabel>
              <FormControl
                type="text"
                name="price"
                defaultValue={ product && product.price }
                placeholder="Enter a product price."
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">
              { product && product._id ? 'Save Changes' : 'Add Product' }
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

ProductEditor.propTypes = {
  product: React.PropTypes.object,
};
