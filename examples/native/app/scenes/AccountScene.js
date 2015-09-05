"use strict";

import React      from "react-native";
import Components from "../components";
import ShopifyAPI from "shopify-api-flux";
import Utilities  from "../utilities";

const { ListView, StyleSheet, View } = React;
const { Shop }                       = ShopifyAPI;
const { Label, ListViewCell }        = Components;
const { ShopDataSource }             = Utilities;
const { Color }                      = Utilities.Branding;

export default class AccountScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shop: new ShopDataSource() };
  }

  componentWillMount() {
    Shop.store.addListener(this._shopAvailable.bind(this));
  }

  componentDidMount() {
    Shop.fetch();
  }

  _shopAvailable() {
    let shop = this.state.shop.cloneWithShop(Shop.store.getCurrent());
    this.setState({ shop });
  }

  _renderRow(value) {
    return <ListViewCell id={ value } title={ value } />;
  }

  _renderHeader(value) {
    return (
      <View style={ styles.header }>
        <Label>{ value }</Label>
      </View>
    );
  }

  render() {
    let { shop } = this.state;

    return (
      <ListView
        renderRow={ this._renderRow }
        renderSectionHeader={ this._renderHeader }
        dataSource={ shop } />
    );
  }
}

let styles = StyleSheet.create({
  header: {
    alignItems:       "center",
    backgroundColor:  Color.slate
  }
});
