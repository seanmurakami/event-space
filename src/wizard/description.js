import React, {Fragment} from 'react'
import { Form, FormGroup, Label, Button } from 'reactstrap'

export default function Description(props) {
  function updateDescription(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userDescription = {
      eventDescription: formData.get('event-description')
    }
    props.update(userDescription, 'date')
  }
  return (
    <Fragment>
      <h3 className="text-center">Make a Description For Your Event!</h3>
      <Form onSubmit={ updateDescription }>
        <FormGroup>
          <Label>Description:</Label>
          <textarea
            name="event-description"
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
