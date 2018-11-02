import React, { Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.userInput = this.userInput.bind(this)
  }
  userInput(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = {
      eventName: formData.get('event-name'),
      eventLocation: formData.get('event-location')
    }
    if (!userData.eventName || !userData.eventLocation) {
      alert('Please enter an event name and location.')
    }
    else {
      this.props.updateEvent(userData, 'description')
    }
  }
  render() {
    return (
      <Fragment>
        <h3 className="font-weight-light text-center">Create An Event!</h3>
        <Form autoComplete="off" onSubmit={ this.userInput }>
          <FormGroup>
            <Label>Event Name</Label>
            <Input name="event-name" placeholder="Input event name" />
          </FormGroup>
          <FormGroup>
            <Label>Event Location</Label>
            <Input name="event-location" placeholder="Input event location" />
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button className="w-50" color="info">Continue</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}
