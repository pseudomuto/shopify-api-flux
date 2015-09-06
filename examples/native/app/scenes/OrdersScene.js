"use strict";

import React      from "react-native";
import Components from "../components";
import ShopifyAPI from "shopify-api-flux";

const { ListView}      = React;
const { Order }        = ShopifyAPI;
const { ListViewCell } = Components;

export default class OrdersScene extends React.Component {
  static get propTypes() {
    return { navigator: React.PropTypes.isRequired };
  }

  constructor(props) {
    super(props);

    let orders = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = { orders };
  }

  componentWillMount() {
    Order.store.addListener(this._ordersChanged.bind(this));
  }

  componentDidMount() {
    Order.fetch();
  }

  _ordersChanged() {
    let orders = this.state.orders.cloneWithRows(Order.store.where());
    this.setState({ orders });
  }

  _renderOrder(order) {
    let { id, name, total_price } = order;

    return (
      <ListViewCell
        id={ id }
        title={ `${name} - $${total_price}` } />
    );
  }

  render() {
    let renderer = this._renderOrder.bind(this);

    return (
      <ListView
        dataSource={ this.state.orders }
        renderRow={ renderer } />
    );
  }
}
