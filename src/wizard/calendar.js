import React, { Fragment } from 'react'
import ButtonGroup from './button-group'
import { Form, FormGroup, Row, Label, Input, Col } from 'reactstrap'

export default class ShowCalendar extends React.Component {
  constructor(props) {
    super(props)
    const date = new Date()
    this.state = {
      date,
      startDate: date.toDateString(),
      endDate: date.toDateString()
    }
    this.onChange = this.onChange.bind(this)
    this.eventDate = this.eventDate.bind(this)
  }
  onChange(date) {
    if (Array.isArray(date)) {
      this.setState({
        date,
        startDate: date[0].toDateString(),
        endDate: date[1].toDateString()
      })
    }
    else {
      this.setState({ date })
    }
  }
  eventDate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const dates = {
      startDate: formData.get('event-start'),
      endDate: formData.get('event-end')
    }
    this.props.eventDate(dates, 'lodging')
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center">Set the Date For Your Event!</h3>
        <Form autoComplete="off" onSubmit={ this.eventDate }>
          <Row form>
            <Col sm={6}>
              <FormGroup>
                <Label>Start Date:</Label>
                <Input
                  readOnly
                  name="event-start"
                  value={ this.state.startDate }/>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label>End Date:</Label>
                <Input
                  readOnly
                  name="event-end"
                  value={ this.state.endDate }/>
              </FormGroup>
            </Col>
          </Row>
          <ButtonGroup params="create?step=description"/>
        </Form>
      </Fragment>
    )
  }
}
