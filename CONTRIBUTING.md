# You Rock!

I definitely will need some help with this! I'm happy to receive issues, ideas, perf problems, and of course pull
requests!

## Some Useful Commands

### Linting and Testing

* `npm run lint` - lint everything in the lib folder
* `npm test` - run all the tests
* `npm test resources` - run only the tests in resources
* `npm run ci` - lint and run all tests

### Generating the Distribution and Documentation

* `npm run doc` - Generates the documentation in `doc/`
* `npm run build` - Generates the distribution (ES5) script in `dist/` and also generates the documentation.

### Releasing

Travis is configured to push a new version to NPM whenever a tag is pushed. To push a new version, run the following
command:

`npm version (patch|minor|major)`

Releasing a new version should be done on a clean master. It will do the following (any failure stops the process):

* Lint and run all tests
* Generate a new dist version and update the docs
* Bump the version in package.json
* Add all changes and make a commit
* Create a tag for the release
* Push all changes/tags and publish docs to http://pseudomuto.com/shopify-api-flux

## Contributing

1. Fork it ( https://github.com/pseudomuto/shopify-api-flux/fork )
1. Create your feature branch (git checkout -b my-new-feature)
1. Write tests for your feature, or regression tests highlighting a bug
1. Write the feature itself, or fix your bug
1. Commit your changes (git commit -am "Add some feature")
1. Push to the branch (git push origin my-new-feature)
1. Create a new Pull Request

Be sure to update any documentation and if possible, make the examples excercise your feature.
