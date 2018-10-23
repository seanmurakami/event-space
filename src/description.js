import React, {Fragment} from 'react'
import { Form, FormGroup, Label, Button } from 'reactstrap'

export default function Description(props) {
  return (
    <Fragment>
      <h3 className="text-center">Make a Description For Your Event!</h3>
      <Form>
        <FormGroup>
          <Label>Description:</Label>
          <textarea
            name="event-name"
            rows="5"
            className="form-control"
            placeholder="Enter a description for your event: " />
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button href="#" color="primary">Previous</Button>
          <Button color="primary">Continue</Button>
        </div>
      </Form>
    </Fragment>
  )
}
