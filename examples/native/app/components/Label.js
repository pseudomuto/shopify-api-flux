"use strict";

import React     from "react-native";
import Utilities from "../utilities";

const { StyleSheet, Text } = React;
const { Color, Default }   = Utilities.Branding;

export default class Label extends React.Component {
  static get propTypes() {
    return { children: React.PropTypes.string.isRequired };
  }

  render() {
    return (
      <Text
        style={ styles.label }>
        { this.props.children }
      </Text>
    );
  }
}

let styles = StyleSheet.create({
  label: {
    color: Color.black,
    fontWeight: "bold",
    marginVertical: Default.spacing
  }
});
