import React from 'react'
import { Form, FormGroup, Label, Input, Card, Button } from 'reactstrap'

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <Card className="shadow w-50 p-2 mx-auto p-3">
          <h3 className="text-center">Create An Event!</h3>
          <Form>
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
        </Card>
      </div>
    )
  }
}
