"use strict";

import React from "react-native";

const { ScrollView, StyleSheet } = React;

export default class Container extends React.Component {
  static get propTypes() {
    return { children: React.PropTypes.element.isRequired };
  }

  render() {
    let { children } = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={ false }
        contentContainerStyle={ styles.container }
        style={ styles.scrollView }>
        { children }
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  scrollView: {
    marginTop: 64,
    marginBottom: 49
  },

  container: {
    flex: 1
  }
});
