"use strict";

import React     from "react-native";
import Utilities from "../utilities";

const {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

const { Color, Default } = Utilities.Branding;

export default class ProductRow extends React.Component {
  static get propTypes() {
    return {
      onPress: React.PropTypes.func,
      product: React.PropTypes.object.isRequired
    };
  }

  _onSelect() {
    if (this.props.onPress) {
      this.props.onPress(this.props.product);
    }
  }

  render() {
    let { image, title } = this.props.product;
    let handler = this._onSelect.bind(this);

    return (
      <TouchableHighlight onPress={ handler } underlayColor={ Color.slate }>
        <View style={ styles.container }>
          <Image style={ styles.image } source={{ uri: image.src }} />
          <Text style={ styles.title }>{ title }</Text>
          <Image style={ styles.indicator } source={{ uri: "disclosure-indicator" }} />
        </View>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.gray,
    borderBottomWidth: 1,
    paddingHorizontal: Default.spacing,
    paddingVertical: Default.spacing
  },

  title: {
    flex: 1
  },

  image: {
    width: 24,
    height: 24,
    marginRight: Default.spacing
  },

  indicator: {
    width: 12,
    height: 12
  }
});
