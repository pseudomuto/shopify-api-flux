"use strict";

import React      from "react-native";
import Components from "../components";

const { Image, StyleSheet, View } = React;
const { Container, Label }        = Components;

export default class ProductScene extends React.Component {
  static get propTypes() {
    return { product: React.PropTypes.object.isRequired };
  }

  render() {
    let { product } = this.props;

    return (
      <Container style={ styles.container }>
        <View style={ styles.container }>
          <Label>{ product.title }</Label>
          <Image style={ styles.image } source={{ uri: product.image.src }} />
        </View>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  image: {
    resizeMode: "contain",
    width: 300,
    height: 300
  }
});
