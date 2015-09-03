"use strict";

import React        from "react-native";
import AccountScene from "./AccountScene";
import RootScene    from "./RootScene";

const { TabBarIOS, View } = React;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: "Account" }
  }

  render() {
    let { selectedTab } = this.state;

    return (
      <TabBarIOS>
        { this._renderTab("Products", "tabbar-products", View) }
        { this._renderTab("Orders", "tabbar-orders", View) }
        { this._renderTab("Account", "tabbar-account", View) }
      </TabBarIOS>
    );
  }

  _renderTab(title: string, icon: string, component: object) {
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
}
