"use strict";

import React         from "react-native";
import AccountScene  from "./AccountScene";
import ProductsScene from "./ProductsScene";
import RootScene     from "./RootScene";

const { TabBarIOS } = React;

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: "Products" };
  }

  _renderTab(title, icon, component) {
    return (
      <TabBarIOS.Item
        title={ title }
        icon={{ uri: icon }}
        onPress={() => this.setState({ selectedTab: title })}
        selected={ this.state.selectedTab === title }>
        <RootScene title={ title } component={ component } />
      </TabBarIOS.Item>
    );
  }

  render() {
    return (
      <TabBarIOS>
        { this._renderTab("Products", "tabbar-products", ProductsScene) }
        { this._renderTab("Account", "tabbar-account", AccountScene) }
      </TabBarIOS>
    );
  }
}
