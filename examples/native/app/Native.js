"use strict";

import React      from "react-native";
import Scenes     from "./scenes";
import ShopifyAPI from "shopify-api-flux";

const { AppRegistry, AsyncStorage } = React;
const { MainScene, LoginScene }     = Scenes;
const { Session }                   = ShopifyAPI;

class Native extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasActiveSession: false };
  }

  componentWillMount() {
    Session.store.addListener(this._onSessionCreated.bind(this));
  }

  componentDidMount() {
    AsyncStorage.getItem("sessionInfo").then(info => {
      if (!info) {
        return;
      }

      let data = JSON.parse(info);
      Session.init(data.domain, data.token);
    });
  }

  _onSessionCreated() {
    let data = { domain: Session.store.getDomain(), token: Session.store.getAccessToken() };
    AsyncStorage.setItem("sessionInfo", JSON.stringify(data));

    this.setState({ hasActiveSession: true });
  }

  render() {
    if (this.state.hasActiveSession) {
      return <MainScene />;
    }

    return <LoginScene />;
  }
}

AppRegistry.registerComponent("Native", () => Native);
