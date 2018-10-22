import React, { Fragment } from 'react'
import Navbar from './navbar'
import CreateEvent from './create-event'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: null,
      eventLocation: null
    }
    this.updateEvent = this.updateEvent.bind(this)
  }
  updateEvent({ eventName, eventLocation }) {
    this.setState({ eventName, eventLocation })
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <CreateEvent updateEvent={ this.updateEvent }/>
      </Fragment>
    )
  }
}
