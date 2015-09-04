"use strict";

import React from "react-native";

const { NavigatorIOS, StyleSheet } = React;

export default class RootScene extends React.Component {
  static get propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      component: React.PropTypes.func.isRequired
    };
  }

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
