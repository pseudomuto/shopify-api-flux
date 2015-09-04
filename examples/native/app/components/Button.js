"use strict";

import NativeButton from "react-native-button";
import React        from "react-native";
import Utilities    from "../utilities";

const { StyleSheet }     = React;
const { Color, Default } = Utilities.Branding;

export default class Button extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
      ]).isRequired,
      disabled: React.PropTypes.bool,
      onPress: React.PropTypes.func
    };
  }

  render() {
    let { children, disabled, onPress } = this.props;
    let generatedStyles = [styles.button];

    if (disabled) {
      generatedStyles.push(styles.disabled);
    }

    return (
      <NativeButton
        disabled={ disabled }
        onPress={ onPress }
        style={ generatedStyles }>
      { children }
      </NativeButton>
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
