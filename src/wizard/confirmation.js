import React, { Fragment } from 'react'
import { Button, Row, Col, Card, CardHeader, CardBody, CardText } from 'reactstrap'
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
        <CardHeader className="text-center font-weight-light">
          <CardText tag="h1">{ eventName }</CardText>
          <CardText>{ eventLocation }</CardText>
        </CardHeader>
        <CardBody className="text-center px-0">
          <CardText tag="h5">Description:</CardText>
          <CardText>{!!eventDescription !== false && eventDescription }</CardText>
          <CardText tag="h5">When:</CardText>
          <Row className="d-flex justify-content-center mx-auto mb-3">
            <Col className="col-md-auto" xs={6}>
              <CardText className="mb-0">Start Date</CardText>
              <CardText className="border rounded p-2 bg bg-light">{ startDate }</CardText>
            </Col>
            <Col className="col-md-auto" xs={6}>
              <CardText className="mb-0">End Date</CardText>
              <CardText className="border rounded p-2 bg bg-light">{ endDate }</CardText>
            </Col>
          </Row>
          <CardText tag="h5">Lodging</CardText>
          <Row className="d-flex justify-content-center mb-2">
            {
              Object.keys(lodges).length !== 0 &&
              lodges.map((lodge, index) => {
                return (
                  <Col key={index} className="mb-2" sm={6}>
                    <Card>
                      <CardHeader className="text-center">
                        { lodge.locationAddress }
                      </CardHeader>
                      <CardBody>
                        <Row className="d-flex justify-content-around">
                          <CardText className="text-success mb-0">{`Cost: $${lodge.locationCost}`}
                          </CardText>
                          <CardText className="mb-0">
                            {`Type: ${lodge.locationType}`}
                          </CardText>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
          <Row className="mb-2">
            <Col>
              <CardText tag="h5">Food</CardText>
              <ConfirmationList items={ food } />
            </Col>
            <Col md={6}>
              <CardText tag="h5">Activities</CardText>
              <ConfirmationList items={ activities } />
            </Col>
          </Row>
          <Button onClick={ this.submitEvent } color="info">Submit Event!</Button>
        </CardBody>
      </Fragment>
    )
  }
}
