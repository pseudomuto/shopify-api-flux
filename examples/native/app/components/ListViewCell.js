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

export default class ListViewCell extends React.Component {
  static get propTypes() {
    let idTypes = [React.PropTypes.number, React.PropTypes.string];

    return {
      id:       React.PropTypes.oneOfType(idTypes).isRequired,
      title:    React.PropTypes.string.isRequired,
      image:    React.PropTypes.object,
      onPress:  React.PropTypes.func
    };
  }

  _onSelect() {
    if (this.props.onPress) {
      this.props.onPress(this.props.id);
    }
  }

  _renderImage() {
    if (this.props.image) {
      let { image } = this.props;
      return <Image style={ styles.image } source={ image } />;
    }
  }

  _renderTitle() {
    let { title } = this.props;

    return (
      <Text style={ styles.title }>{ title }</Text>
    );
  }

  _renderIndicator() {
    if (this.props.onPress) {
      return <Image style={ styles.indicator } source={{ uri: "disclosure-indicator" }} />;
    }
  }

  render() {
    let handler = this._onSelect.bind(this);

    return (
      <TouchableHighlight onPress={ handler } underlayColor={ Color.slate }>
        <View style={ styles.container }>
          { this._renderImage() }
          { this._renderTitle() }
          { this._renderIndicator() }
        </View>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection:      "row",
    alignItems:         "center",
    borderColor:        Color.gray,
    borderBottomWidth:  1,
    paddingHorizontal:  Default.spacing,
    paddingVertical:    Default.spacing
  },

  title: {
    flex: 1
  },

  image: {
    width:        24,
    height:       24,
    marginRight:  Default.spacing
  },

  indicator: {
    width:   12,
    height:  12
  }
});
