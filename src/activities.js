import React, { Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'

export default class Activities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center mb-3">Add Events/Activities!</h3>
        <Form autoComplete="off">
          <FormGroup row>
            <Label md={3}>Event/Activity:</Label>
            <Col md={9}>
              <Input name="event-type" placeholder="e.g. Walk the Great Wall of China" />
            </Col>
          </FormGroup>
        </Form>
        <div className="d-flex justify-content-between">
          <Button href="#create?step=lodging" color="primary">Previous</Button>
          <Button name="continue" color="primary">Continue</Button>
        </div>
      </Fragment>
    )
  }
}
