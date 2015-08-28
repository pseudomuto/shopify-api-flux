# Shopify API Flux

A flux version of the Shopify API.

**THIS IS SO FAR FROM BEING READY THAT YOU MIGHT NOT EVEN WANT TO TRY IT YET**

## Usage

```javascript
import ShopifyAPI from "shopify-api-flux";

// set the API token
ShopifyAPI.Auth.setAuthToken("YOUR_SHOPIFY_API_TOKEN")

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
    ShopifyAPI.ShopStore.addChangeListener(this._onChange.bind(this));
  }

  componentDidMount() {
    ShopifyAPI.Shop.fetch()
  }

  componentWillUnmount() {
    ShopifyAPI.ShopStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ shop: ShopifyAPI.ShopStore.get() });
  }
}
```
