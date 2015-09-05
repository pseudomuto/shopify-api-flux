"use strict";

import React        from "react-native";
import Components   from "../components";
import ProductScene from "./ProductScene";
import ShopifyAPI   from "shopify-api-flux";

const { ListView }     = React;
const { Product }      = ShopifyAPI;
const { ListViewCell } = Components;

export default class ProductsScene extends React.Component {
  static get propTypes() {
    return { navigator: React.PropTypes.object.isRequired };
  }

  constructor(props) {
    super(props);

    let products = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state   = { products };
  }

  componentWillMount() {
    Product.store.addListener(this._productsChanged.bind(this));
  }

  componentDidMount() {
    Product.fetch();
  }

  _productsChanged() {
    let products = this.state.products.cloneWithRows(Product.store.where());
    this.setState({ products });
  }

  _onProductSelected(id) {
    let product = Product.store.at(id);

    this.props.navigator.push({
      title:      product.title,
      component:  ProductScene,
      passProps:  { product }
    });
  }

  _renderProduct(product) {
    let { id, image, title } = product;
    let handler              = this._onProductSelected.bind(this);

    return (
      <ListViewCell
        id={ id }
        image={{ uri: image.src }}
        onPress={ handler }
        title={ title } />
    );
  }

  render() {
    let renderer = this._renderProduct.bind(this);

    return (
      <ListView
        dataSource={ this.state.products }
        renderRow={ renderer } />
    );
  }
}
