"use strict";

import React from "react-native";

const { NavigatorIOS, StyleSheet } = React;

export default class extends React.Component {
  render() {
    let { title, component } = this.props;

    return (
      <NavigatorIOS
        style={ styles.nav }
        initialRoute={{ title, component }} />
    );
  }
}

let styles = StyleSheet.create({
  nav: {
    flex: 1
  }
});
