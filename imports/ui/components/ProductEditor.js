import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import productEditor from '../../modules/product-editor'

export default class ProductEditor extends React.Component {
  componentDidMount() {
    productEditor({ component: this });
    setTimeout(() => {
      document.querySelector('[name="name"]').focus(); }, 0);
  }
  render() {
    const { product } = this.props;
    return (
      <form
        ref={ form => (this.productEditorForm = form ) }
        onSubmit={ event => event.preventDefault() }
      >
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
          name="description"
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
      </form>
    )
  }
}

ProductEditor.propTypes = {
  product: React.PropTypes.object,
};
