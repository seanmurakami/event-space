import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class ShowCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(date) {
    this.setState({ date })
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center">Set the Date For Your Event!</h3>
        <Form>
          <FormGroup>
            <Label>Event Name:</Label>
            <Input name="event-name" placeholder="Input event name" />
          </FormGroup>
          <FormGroup>
            <Label>Event Location:</Label>
            <Input name="event-location" placeholder="Input event location" />
          </FormGroup>
          <Calendar onChange={ this.onChange } value={ this.state.date } className="my-3 mx-auto"/>
          <div className="d-flex justify-content-center">
            <Button href="#create?step=date" className="w-50" color="primary">Continue</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}
