## Getting started
### Node
Ensure you have a compatible node version mentioned in `.node-version`

For example, with nodenv:
`nodenv install`

### Packages
Using yarn package manager:
`yarn install`

### Running tests
Optionally specify file or folder for a specific test.
`yarn test [path]`

### Dev server
`yarn dev`


### Test with local project

Generate dist files with: `yarn build`

Then, in your other project directory:

Include with local file reference: `yarn add file:/path/to/stimulus-rails-nested-form`

Update reference to this dir, eg:
```js
import NestedForm from '/path/to/stimulus-rails-nested-form/dist/stimulus-rails-nested-form.umd.js' // the default module entry point is broken for webpacker
```
