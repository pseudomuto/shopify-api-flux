"use strict";

import React      from "react-native";
import Components from "../components";
import ShopifyAPI from "shopify-api-flux";

const { View, Text } = React;
const { Shop }       = ShopifyAPI;
const { Container }  = Components;

export default class AccountScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shop: {} };
  }

  componentWillMount() {
    Shop.store.addListener(this._shopAvailable.bind(this));
  }

  componentDidMount() {
    Shop.fetch();
  }

  _shopAvailable() {
    let shop = Shop.store.getCurrent();
    this.setState({ shop });
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Text>{ JSON.stringify(this.state.shop) }</Text>
        </View>
      </Container>
    );
  }
}
