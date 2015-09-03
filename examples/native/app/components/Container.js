"use strict";

import React from "react-native";

const { ScrollView, StyleSheet } = React;

export default class extends React.Component {
  render() {
    let { children } = this.props;

    <ScrollView
      automaticallyAdjustContentInsets={ false }
      contentContainerStyle={ styles.container }
      style={ styles.scrollView }>
      { children }
    </ScrollView>
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
