Original (https://github.com/mbrochh/django-reactjs-boilerplate)

# Step 1: Create your Django project

* If you don't have `mkvirtualenv`

```bash
# usign pip
# (window)
pip install virtualenvwrapper-win
# (Linux & Mac)
pip install virtualenvwrapper
```
* virtual Environments

```bash
mkvirtualenv djreact
pip install Django
django-admin startproject djreact
mv djreact django
# (window)
rename djreact django
```

* Running Server

```bash
# (window)
python manage.py runserver
# (Linux & Mac)
./manage.py runserver
```

# Step 2: Add non-reactJS views

1.  Add the following lines to `urls.py`:

```python
from django.views import generic

urlpatterns = [
  url(r'^admin/', admin.site.urls),
  url(r'^view2/',
      generic.TemplateView.as_view(template_name='view2.html')),
  url(r'^$',
      generic.TemplateView.as_view(template_name='view1.html')),
]
```

2. Create `template` folder and add the following lines to `settings.py`:

```python
TEMPLATES = [
    {
        ...
        'DIRS': [os.path.join(BASE_DIR, 'djreact/templates')],
        ...
    },
]
```

3. Create `base.html` in the `template` and add the following lines to `base.html` for importing [Twitter Bootstrap CSS Framework](http://getbootstrap.com):

```html
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  </head>
  <body>
    {% block main %}{% endblock %}
  </body>
</html>
```


4. Create `view1.html` in the `template` and add the following lines to `view1.html`:

```html
{% extends "base.html" %}

{% block main %}
<div class="container">
  <h1>View 1</h1>
</div>
{% endblock %}
```


5. Create `view2.html` in the `template` and add the following lines to `view2.html`:

```html
{% extends "base.html" %}

{% block main %}
<div class="container">
  <h1>View 2</h1>
</div>
{% endblock %}
```


# Step 3: Add django-webpack_loader

1. Install `django-webpack_loader` and add `requirements.txt`

```bash
pip install django-webpack_loader
pip freeze
```
After `pip freeze` and copy and paste that package with it's version number into your `requirements.txt`
ex) `requirements.txt`
```txt
cffi==1.9.1
cryptography==1.7.1
Django==1.9.3
django-webpack-loader==0.2.4
Fabric==1.10.2
idna==2.2
paramiko==2.1.1
pbr==1.10.0
pyasn1==0.1.9
pycparser==2.17
six==1.10.0
stevedore==1.20.0
virtualenv==15.1.0
virtualenv-clone==0.2.6
virtualenvwrapper==4.7.2
virtualenvwrapper-win==1.2.1
```

2. Add the following lines to `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'webpack_loader',
]
```

3. Create `static` folder and add the following lines to `settings.py`:

```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'djreact/static'),
]
```

4. Create `package.json` file and add below:

```json
{
  "name": "djreact",
  "version": "0.0.1",
  "scripts": {
    "serve": "node_modules/.bin/webpack --config webpack.local.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "babel": "^6.5.2",
    "babel-core": "^6.6.5",
    "babel-eslint": "^5.0.0",
    "babel-loader": "^6.2.4",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "eslint": "^2.2.0",
    "react": "^0.14.7",
    "react-hot-loader": "^1.3.0",
    "redux-devtools": "^3.1.1",
    "webpack": "^1.12.13",
    "webpack-bundle-tracker": "0.0.93",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "es6-promise": "^3.1.2",
    "isomorphic-fetch": "^2.2.1",
    "lodash": "^4.5.1",
    "radium": "^0.16.6",
    "react-cookie": "^0.4.5",
    "react-dom": "^0.14.7",
    "react-redux": "^4.4.0",
    "redux": "^3.3.1",
    "redux-thunk": "^1.0.3"
  }
}
```

And `npm install`
```bash
npm install
```

5. webpack

* Add the following lines to `webpack.base.config.js`

```js
var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    App: './reactjs/App',
    vendors: ['react'],
  },

  output: {
      path: path.resolve('./djreact/static/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
```

* Create `webpack.local.config.js` file and add below:

```js
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.base.config.js')

config.devtool = "#eval-source-map"

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-local.json'}),
])

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] }
)

module.exports = config
```


6. Create `.babelrc` and add below:

```js
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": [
    ["transform-decorators-legacy"],
  ]
}
```

7. Create `reactjs` folder

8. Create `App.js`, `containers/App1Container.js`, and `components/Headline.js` in `reactjs`, and add below:

* `App.js`

```js
import React from "react"
import { render } from "react-dom"

import App1Container from "./containers/App1Container"

class App extends React.Component {
  render() {
    return (
      <App1Container />
    )
  }
}

render(<App/>, document.getElementById('App'))
```

* `containers/App1Container.js`

```js
import React from "react"

import Headline from "../components/Headline"

export default class App1Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
          </div>
        </div>
      </div>
    )
  }
}
```

* `components/Headline.js`

```js
import React from "react"

export default class Headline extends React.Component {
  render() {
    return (
      <h1>{ this.props.children }</h1>
    )
  }
}
```

9. Generate some files in `djreact/static/bundles/`

```bash
npm run serve
```


# Step 4: Use the bundle

1. Change `view1.html`:

```html
{% extends "base.html" %}
{% load render_bundle from webpack_loader %}

{% block main %}
<div id="App"></div>
{% render_bundle 'vendors' %}
{% render_bundle 'App' %}
{% endblock %}
```

2. Add below to `settings.py`:

```python
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/local/',  # end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-local.json'),
    }
}
```

3. Run Server

```bash
npm run serve
python manage.py runserver
```


# Step 5: Hot Reloading

1. Create `server.js` file that will start a webpack-dev-server for us:

```js
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.local.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
}).listen(3000, config.ip, function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at ' + config.ip + ':3000')
})
Next, we need to add/replace the following in our webpack.local.config.js:

var ip = 'localhost'

config.entry = {
  App: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/App',
  ],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats-local.json'}),
])
```

2. Add/Replace the following lines in our `webpack.local.config.js`:

```js
var ip = 'localhost'

config.entry = {
  App: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/App',
  ],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats-local.json'}),
])
```

3. Run server

```bash
node server.js
#other bash
python manage.py runserver
```


# Step 6: Going to production

1. Create `webpack.stage.config.js` and add below:

```js
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./djreact/static/bundles/stage/')

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-stage.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('staging'),
      'BASE_API_URL': JSON.stringify('https://sandbox.example.com/api/v1/'),
  }}),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
])

// Add a loader for JSX files
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
)

module.exports = config
```

2. Create `webpack.prod.config.js` and add below:

```js
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./djreact/static/bundles/prod/')

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'BASE_API_URL': JSON.stringify('https://example.com/api/v1/'),
  }}),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
])

// Add a loader for JSX files
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
)

module.exports = config
```

3. Add/Replace to `webpack.local.config.js` for using the `DefinePlugin`:

```js
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats-local.json'}),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'BASE_API_URL': JSON.stringify('https://'+ ip +':8000/api/v1/'),
  }}),
])
```

4. We can now create stage and prod bundles like this:

```
node_modules/.bin/webpack --config webpack.stage.config.js
node_modules/.bin/webpack --config webpack.prod.config.js
```

5. Put that intoa scropt. Run `pip install Fabric` and add it to `requirements.txt`

```bash
pip install Fabric
```

```txt
// requirements.txt
Fabric==1.10.2
```

* Then add the following `fabfile.py`:

```python
from fabric.api import local

def webpack():
    local('rm -rf djreact/static/bundles/stage/*')
    local('rm -rf djreact/static/bundles/prod/*')
    local('webpack --config webpack.stage.config.js --progress --colors')
    local('webpack --config webpack.prod.config.js --progress --colors')
```

6. Your workflow will now look like this:

* Start `python manage.py runserver`

* Start `node server.js`

* Edit your ReactJS app

* When done, commit your changes

* Run `fab webpack` and commit your new bundles

* Run a deployment


7. Override `settings.py`:

```python
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/stage/',  # end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-stage.json'),
    }
}
```


# Step 7: Add redux

1. Create `reactjs/actions/counterActions.js` form Action Creators:

```js
export const INCREASE = "INCREASE"
export function increaseCounter() {
    return {type: INCREASE}
}
```

2. Create `reactjs/reducers/counters.js`:

```js
import * as sampleActions from "../actions/counterActions"

const initialState = {
  clicks: 0,
}

export default function counters(state=initialState, action={}) {
  switch (action.type) {
  case sampleActions.INCREASE:
    return {...state, clicks: state.clicks + 1}
  default:
    return state
  }
}
```

3. Create `reactjs/reducers/index.js`:

```js
export { default as counters } from './counters'
```

4. Modify `App.js`:

```js
import React from "react"
import { render } from "react-dom"
import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import * as reducers from "./reducers"
import App1Container from "./containers/App1Container"

let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
let reducer = combineReducers(reducers)
let store = finalCreateStore(reducer)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App1Container />
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('App'))
```

5. Modify/Upgrade `App1Container.js`:

```js
import React from "react"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import Headline from "../components/Headline"

@connect(state => ({
  counters: state.counters,
}))
export default class SampleAppContainer extends React.Component {
  handleClick() {
    let {dispatch} = this.props;
    dispatch(counterActions.increaseCounter())
  }

  render() {
    let {counters} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div onClick={() => this.handleClick()}>INCREASE</div>
            <p>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
          </div>
        </div>
      </div>
    )
  }
}
```
