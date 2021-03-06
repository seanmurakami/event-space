import React, { Fragment } from 'react'
import ButtonGroup from '../../components/button-group'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Form, Row, Label, Col } from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'

export default class ShowCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment()
    }
    this.eventDate = this.eventDate.bind(this)
    this.changeStart = this.changeStart.bind(this)
    this.changeEnd = this.changeEnd.bind(this)
  }
  eventDate(e) {
    e.preventDefault()
    const userInfo = Object.assign({}, this.state)
    const updateDates = Object.values(userInfo).map(moment => moment.format('MM/DD/YYYY'))
    this.props.eventDate({startDate: updateDates[0], endDate: updateDates[1]}, 'lodging')
  }
  changeStart(date) {
    this.setState({startDate: date})
  }
  changeEnd(date) {
    this.setState({endDate: date})
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center font-weight-light">Set the Date For Your Event!</h3>
        <Form onSubmit={ this.eventDate } autoComplete="off">
          <div className="d-flex justify-content-center mt-4 mb-4">
            <Row className="border p-2 rounded">
              <Col>
                <Label className="mr-1 d-flex justify-content-center">Start Date</Label>
                <DatePicker
                  id="startDate"
                  className="my-1 p-2 text-center"
                  selected={this.state.startDate}
                  onChange={this.changeStart} />
              </Col>
              <Col>
                <Label className="mr-1 d-flex justify-content-center">End Date</Label>
                <DatePicker
                  id="endDate"
                  className="my-1 p-2 text-center"
                  selected={this.state.endDate}
                  onChange={this.changeEnd} />
              </Col>
            </Row>
          </div>
          <ButtonGroup params="create?step=description"/>
        </Form>
      </Fragment>
    )
  }
}
