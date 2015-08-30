# Shopify API Flux

[![Build Status](https://travis-ci.org/pseudomuto/shopify-api-flux.svg?branch=master)](https://travis-ci.org/pseudomuto/shopify-api-flux)

A flux version of the Shopify API.

**THIS IS SO FAR FROM BEING READY THAT YOU MIGHT NOT EVEN WANT TO TRY IT YET**

## Usage

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
