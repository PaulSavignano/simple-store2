import React from 'react';
import ProductEditor from '../components/ProductEditor.js';

const ProductEdit = ({ product }) => (
  <div className="ProductEdit">
    <h4 className="page-header">Editing "{ product.name }"</h4>
    <ProductEditor product={ product } />
  </div>
);

ProductEdit.propTypes = {
  product: React.PropTypes.object,
};

export default ProductEdit;
