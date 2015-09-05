"use strict";

import React      from "react-native";
import Components from "../components";
import ShopifyAPI from "shopify-api-flux";

const { ListView, StyleSheet } = React;
const { Product }              = ShopifyAPI;
const { ProductRow }           = Components;

export default class ProductsScene extends React.Component {
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

  render() {
    return (
      <ListView
        dataSource={ this.state.products }
        renderRow={row => <ProductRow product={ row } />}
        style={ styles.listView } />
    );
  }
}

let styles = StyleSheet.create({
  listView: {
  }
});
