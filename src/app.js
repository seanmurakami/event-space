import React, { Fragment } from 'react'
import Navbar from './navbar'
import CreateEvent from './create-event'
import { Card } from 'reactstrap'

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
        <div className="mx-3 d-flex justify-content-center">
          <Card className="shadow col-xl-6 col-lg-7 col-md-10 p-4">
            <CreateEvent updateEvent={ this.updateEvent }/>
          </Card>
        </div>
      </Fragment>
    )
  }
}
