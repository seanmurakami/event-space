import React, { Fragment } from 'react'
import { Button, Row, Col } from 'reactstrap'
import ConfirmationList from '../util/confirmation-list'

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInformation: this.props.eventInformation
    }
    this.submitEvent = this.submitEvent.bind(this)
  }
  submitEvent() {
    this.props.update(this.state.userInformation)
  }
  render() {
    const { eventLocation, eventName, eventDescription, startDate, endDate, lodges, activities, food } = this.props.eventInformation
    return (
      <Fragment>
        <div className="text-center bg bg-light font-weight-light mb-2">
          <h1>{ eventName }</h1>
          <h5>{ eventLocation }</h5>
        </div>
        <div>
          <h5>Description:</h5>
          <p>{!!eventDescription !== false && eventDescription }</p>
        </div>
        <div>
          <h5>When:</h5>
          <p>{`Start Date: ${startDate}`}</p>
          <p>{`End Date: ${endDate}`}</p>
        </div>
        <h5>Lodging</h5>
        <Row className="mb-2">
          {
            Object.keys(lodges).length !== 0 &&
            lodges.map((lodge, index) => {
              return (
                <Col md={6} key={index}>
                  <div className="border rounded pt-3 pl-3 mb-2">
                    <p><strong>Type: </strong>{lodge.locationType}</p>
                    <p><strong>Address: </strong>{lodge.locationAddress}</p>
                    <p><strong>Cost: $</strong>{lodge.locationCost}</p>
                  </div>
                </Col>
              )
            })
          }
        </Row>
        <Row className="mb-2">
          <Col>
            <h5>Food</h5>
            <ConfirmationList items={ food } />
          </Col>
          <Col md={6}>
            <h5>Activities</h5>
            <ConfirmationList items={ activities } />
          </Col>
        </Row>
        <Button onClick={ this.submitEvent } color="info">Submit Event!</Button>
      </Fragment>
    )
  }
}
