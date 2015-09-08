# Shopify API Flux

[![Build Status](https://travis-ci.org/pseudomuto/shopify-api-flux.svg?branch=master)](https://travis-ci.org/pseudomuto/shopify-api-flux) [![npm version](https://badge.fury.io/js/shopify-api-flux.svg)](http://badge.fury.io/js/shopify-api-flux)

A flux implementation of the Shopify API.

## Installation

```sh
npm install --save shopify-api-flux
```

## Usage

This project uses ES6 (via Babel et al.). So the examples are in ES6. However, since the distribution (and main file in
package.json) is actually compiled down to ES5, you should be able to use this in your ES5 projects without issue.

Please let me know (or open a PR) if this is not the case.

### Examples

Currently, there is only one example but I intend to add more over time. For now there is a react native app in the
examples/native directory that demonstrates creating and storing a session as well as fetching orders, products and shop
details.

This will get fleshed out more as the API comes closer to complete.

### Quick Start

```javascript
import ShopifyAPI from "shopify-api-flux";

const { Session, Shop } = ShopifyAPI;

// set the Domain and API token
Session.init("YOUR_SHOP", "YOUR_API_TOKEN")

class ShopView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shop: null }
  }

  render() {
    return (
      // YOUR VIEW CODE
    );
  }

  componentWillMount() {
    Shop.store.addListener(this._onChange.bind(this));
  }

  componentDidMount() {
    Shop.fetch()
  }

  _onChange() {
    this.setState({ shop: Shop.store.getCurrent() });
  }
}
```
