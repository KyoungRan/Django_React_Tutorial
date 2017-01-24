import React, {Component} from 'react'
import Headline from '../Components/Headline'

class App1Container extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Somthing Fancy!</Headline>
          </div>
        </div>
      </div>
    )
  }
}

export default App1Container
