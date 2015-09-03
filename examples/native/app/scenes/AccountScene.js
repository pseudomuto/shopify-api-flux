"use strict";

import React      from "react-native";
import Components from "../components";
import ShopifyAPI from "shopify-api-flux";

const { StyleSheet, View } = React;
const { Shop }             = ShopifyAPI;
const { Container }        = Components;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shop: null }
  }

  componentWillMount() {
    Shop.store.addListener(this._shopAvailable.bind(this));
  }

  componentDidMount() {
    Shop.fetch();
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: "red" }} />
      </Container>
    );
  }

  _shopAvailable() {
    this.setState({ shop: Shop.store.get() });
  }
}
