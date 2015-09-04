"use strict";

import React     from "react-native";
import Utilities from "../utilities";

const { StyleSheet, TextInput } = React;
const { Color, Default }   = Utilities.Branding;

export default class Input extends React.Component {
  render() {
    return (
      <TextInput { ...this.props } style={ styles.input } />
    );
  }
}

let styles = StyleSheet.create({
  input: {
    backgroundColor: Color.white,
    borderColor: Color.black,
    borderWidth: 1,
    height: Default.height,
    paddingHorizontal: Default.spacingInner
  }
});
