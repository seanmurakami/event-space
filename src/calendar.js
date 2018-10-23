import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class ShowCalendar extends React.Component {
  constructor(props) {
    super(props)
    const date = new Date()
    this.state = {
      date: date,
      start: date.toDateString(),
      end: date.toDateString()
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(date) {
    if (Array.isArray(date)) {
      this.setState({ date, start: date[0].toDateString(), end: date[1].toDateString() })
    }
    else {
      this.setState({ date })
    }
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center">Set the Date For Your Event!</h3>
        <Form autoComplete="off">
          <FormGroup className="row w-75 mx-auto">
            <div className="col">
              <Label className="col-form-label">Start Date:</Label>
              <Input
                readOnly
                name="event-name"
                value={ this.state.start }/>
            </div>
            <div className="col">
              <Label className="col-form-label">End Date:</Label>
              <Input
                readOnly
                name="event-location"
                value={ this.state.end }/>
            </div>
          </FormGroup>
          <Calendar
            selectRange
            calendarType="US"
            onChange={ this.onChange }
            value={ this.state.date }
            className="my-3 mx-auto shadow"/>
          <div className="d-flex justify-content-between">
            <Button href="#" color="primary">Previous</Button>
            <Button href="#create?step=description" color="primary">Continue</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}
