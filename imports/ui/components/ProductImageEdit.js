import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

class ProductImage extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.renderCanvas();
  }
  renderCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      const width = image.width;
      const height= image.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);
    }
    image.src = this.props.image;
  }
  handleChange(event) {
    event.preventDefault();
    const MAX_WIDTH = 500;
    const MAX_HEIGHT = 500;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const file = event.target.files[0];
    const image = new Image();
    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
      let width = image.width;
      let height = image.height;
      if (width > height && width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      } else if (height > MAX_HEIGHT){
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height)
    }
    reader.readAsDataURL(file)
  }
  render() {
    return (
      <FormGroup>
        <canvas ref="canvas" name="canvas" />
        <FormControl type="file" onChange={ this.handleChange }/>
      </FormGroup>
    )
  }
}

ProductImage.propTypes = {
  image: React.PropTypes.string.isRequired,
}

export default ProductImage
