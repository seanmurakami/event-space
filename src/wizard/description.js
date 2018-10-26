import React, {Fragment} from 'react'
import ButtonGroup from '../util/button-group'
import { Form, FormGroup, Label } from 'reactstrap'

export default function Description(props) {
  function updateUserInfo(e) {
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
      <Form onSubmit={ updateUserInfo }>
        <FormGroup>
          <Label>Description:</Label>
          <textarea
            name="event-description"
            rows="5"
            className="form-control"
            placeholder="Enter a description for your event: " />
        </FormGroup>
        <ButtonGroup params=""/>
      </Form>
    </Fragment>
  )
}
