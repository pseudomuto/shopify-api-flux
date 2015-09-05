"use strict";

import React        from "react-native";
import Components   from "../components";
import ProductScene from "./ProductScene";
import ShopifyAPI   from "shopify-api-flux";

const { ListView, StyleSheet } = React;
const { Product }              = ShopifyAPI;
const { ProductRow }           = Components;

export default class ProductsScene extends React.Component {
  static get propTypes() {
    return { navigator: React.PropTypes.object.isRequired };
  }

  constructor(props) {
    super(props);

    let ds     = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { products: ds.cloneWithRows([]) };
  }

  componentWillMount() {
    Product.store.addListener(this._productsChanged.bind(this));
  }

  componentDidMount() {
    Product.fetch();
  }

  _productsChanged() {
    let ds       = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let products = ds.cloneWithRows(Product.store.where());

    this.setState({ products });
  }

  _onProductSelected(product) {
    this.props.navigator.push({
      title: product.title,
      component: ProductScene,
      passProps: { product }
    });
  }

  render() {
    let handler = this._onProductSelected.bind(this);

    return (
      <ListView
        dataSource={ this.state.products }
        renderRow={row => <ProductRow onPress={ handler } product={ row } />}
        style={ styles.listView } />
    );
  }
}

let styles = StyleSheet.create({
  listView: {
  }
});
