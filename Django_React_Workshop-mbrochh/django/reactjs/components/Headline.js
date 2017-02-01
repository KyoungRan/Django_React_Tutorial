import React, {Component} from 'react'

class Headline extends Component {
  render() {
    return (
      <h1>{this.props.children}</h1>
    )
  }
}

export default Headline
