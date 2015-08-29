# Shopify API Flux

A flux version of the Shopify API.

**THIS IS SO FAR FROM BEING READY THAT YOU MIGHT NOT EVEN WANT TO TRY IT YET**

## Usage

```javascript
import ShopifyAPI from "shopify-api-flux";

// set the Domain and API token
ShopifyAPI.Session.init("YOUR_SHOP", "YOUR_API_TOKEN")

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
    ShopifyAPI.ShopStore.addListener(this._onChange.bind(this));
  }

  componentDidMount() {
    ShopifyAPI.Shop.fetch()
  }

  _onChange() {
    this.setState({ shop: ShopifyAPI.ShopStore.getCurrent() });
  }
}
```
