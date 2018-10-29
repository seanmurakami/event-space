import React, { Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

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
    this.props.updateEvent(userData, 'description')
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center">Create An Event!</h3>
        <Form onSubmit={ this.userInput }>
          <FormGroup>
            <Label>Event Name:</Label>
            <Input name="event-name" placeholder="Input event name" />
          </FormGroup>
          <FormGroup>
            <Label>Event Location:</Label>
            <Input name="event-location" placeholder="Input event location" />
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button className="w-50" color="primary">Continue</Button>
          </div>
        </Form>
        <Row className="mt-3">
          <Col md={6} key={1}>
            <div className="bg bg-light border rounded p-2 mb-2">
              <p>{`Type: Hotel`}</p>
              <p>{`Address: 12809 Lexington Ave`}</p>
              <p>{`Cost: $89`}</p>
            </div>
          </Col>
          <Col md={6} key={2}>
            <div className="border rounded p-2">
              <p>{`Type: Airbnb`}</p>
              <p>{`Address: 123 Address Place`}</p>
              <p>{`Cost: $129`}</p>
            </div>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
