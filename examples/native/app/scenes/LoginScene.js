"use strict";

import Components from "../components";
import React      from "react-native";
import ShopifyAPI from "shopify-api-flux";
import Utilities  from "../utilities";

const { StyleSheet, Text, View } = React;
const { Color, Default }         = Utilities.Branding;
const { Button, Input, Label }   = Components;
const { Session }                = ShopifyAPI;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: "", token: "" }
  }

  render() {
    let disabled      = this._isDisabled();
    let domainChanged = this._onDomainChanged.bind(this);
    let tokenChanged  = this._onTokenChanged.bind(this);
    let buttonPressed = this._onButtonClick.bind(this);

    return (
      <View style={ styles.container }>
        <Label>Domain</Label>
        <Input onChangeText={ domainChanged } placeholder="<shop>.myshopify.com" />

        <Label>Access Token</Label>
        <Input secureTextEntry={ true } onChangeText={ tokenChanged }/>

        <Button disabled={ disabled } onPress={ buttonPressed }>Get Started</Button>

        <Text style={ styles.footer }>
          The quickest way I know of doing this is with the simulator. Copy your API Token to your clipboard.
        </Text>
        <Text style={ styles.footer }>
          Then on the simulator, paste (to copy the clipboard to the device), and then right-click "Paste" in
          the token field.
        </Text>
      </View>
    );
  }

  _isDisabled() {
    return !(this.state.domain && this.state.token);
  }

  _onDomainChanged(domain) {
    this.setState({ domain });
  }

  _onTokenChanged(token) {
    this.setState({ token });
  }

  _onButtonClick() {
    Session.init(this.state.domain, this.state.token);
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.slate,
    justifyContent: "center",
    paddingHorizontal: Default.spacing,
  },

  footer: {
    color: Color.grayDark,
    fontSize: 14,
    marginTop: Default.spacing,
    paddingHorizontal: Default.spacing,
    textAlign: "center"
  }
});
