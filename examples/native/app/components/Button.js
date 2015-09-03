"use strict";

import Button    from "react-native-button";
import React     from "react-native";
import Utilities from "../utilities";

const { StyleSheet }     = React;
const { Color, Default } = Utilities.Branding;

export default class extends React.Component {
  render() {
    let { children, disabled, onPress } = this.props;
    let generatedStyles = [styles.button];

    if (disabled) {
      generatedStyles.push(styles.disabled)
    }

    return (
      <Button
        disabled={ disabled }
        onPress={ onPress }
        style={ generatedStyles }>
      { children }
      </Button>
    );
  }
}

let styles = StyleSheet.create({
  button: {
    backgroundColor: Color.green,
    color: Color.white,
    height: Default.height,
    paddingHorizontal: Default.spacing,
    paddingVertical: Default.spacingInner,
    marginVertical: Default.spacing
  },

  disabled: {
    backgroundColor: Color.gray
  }
});
