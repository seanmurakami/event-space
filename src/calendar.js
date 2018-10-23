import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class ShowCalendar extends React.Component {
  constructor(props) {
    super(props)
    const date = new Date()
    this.state = {
      date,
      start: date.toDateString(),
      end: date.toDateString()
    }
    this.onChange = this.onChange.bind(this)
    this.eventDate = this.eventDate.bind(this)
  }
  onChange(date) {
    if (Array.isArray(date)) {
      this.setState({ date, start: date[0].toDateString(), end: date[1].toDateString() })
    }
    else {
      this.setState({ date })
    }
  }
  eventDate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const dates = {
      start: formData.get('event-start'),
      end: formData.get('event-end')
    }
    this.props.eventDate(dates)
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center">Set the Date For Your Event!</h3>
        <Form autoComplete="off" onSubmit={ this.eventDate }>
          <FormGroup className="row w-75 mx-auto">
            <div className="col">
              <Label className="col-form-label">Start Date:</Label>
              <Input
                readOnly
                name="event-start"
                value={ this.state.start }/>
            </div>
            <div className="col">
              <Label className="col-form-label">End Date:</Label>
              <Input
                readOnly
                name="event-end"
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
            <Button color="primary">Continue</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}
