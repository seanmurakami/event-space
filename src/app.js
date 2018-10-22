import React, { Fragment } from 'react'
import Navbar from './navbar'
import CreateEvent from './create-event'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <CreateEvent />
      </Fragment>
    )
  }
}
