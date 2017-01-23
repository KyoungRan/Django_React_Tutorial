import React, {Component} from 'react'
import {render} from 'react-dom'

import App1Container from './containers/App1Container'

class App extends Component {
  render() {
    return (
      <App1Container />
    )
  }
}

render(<App />, document.getElementById('App'))
