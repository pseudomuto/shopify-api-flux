"use strict";

import React      from "react-native";
import Components from "../components";
import ShopifyAPI from "shopify-api-flux";

const { View, Text } = React;
const { Product }    = ShopifyAPI;
const { Container }  = Components;

export default class ProductsScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: {} };
  }

  componentWillMount() {
    Product.store.addListener(this._productsChanged.bind(this));
  }

  componentDidMount() {
    Product.fetch();
  }

  _productsChanged() {
    let products = Product.store.where();
    this.setState({ products });
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Text>{ JSON.stringify(this.state.products) }</Text>
        </View>
      </Container>
    );
  }
}
