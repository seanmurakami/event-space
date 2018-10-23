import React, { Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class Lodging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center">Select a Place to Stay!</h3>
        <Form onSubmit={ this.userInput }>
          <FormGroup>
            <Label>Location/Type:</Label>
            <Input name="event-type" placeholder="ex. AirBnb, Hotel, etc." />
          </FormGroup>
          <FormGroup>
            <Label>Address:</Label>
            <Input name="event-address" placeholder="ex. 123 Address St" />
          </FormGroup>
          <FormGroup>
            <Label>Cost:</Label>
            <Input name="event-cost" placeholder="ex. $489" />
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button href="#create?step=date" color="primary">Previous</Button>
            <Button color="primary">Continue</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}
