import React from 'react'
import ConfirmationList from './util/confirmation-list'
import { Card, CardHeader, CardText, CardBody, Row, Col } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '60rem'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { eventName, eventLocation, startDate, endDate, lodges, activities, food } = this.props.selectedEvent
    return (
      <div className="mx-2">
        <Card className="container px-0" style={ styles.width }>
          <CardHeader>
            <CardText tag="h1">{ eventName }</CardText>
            <CardText>{ eventLocation }</CardText>
          </CardHeader>
          <CardBody>
            <h4>When</h4>
            <Row className="d-flex justify-content-center mx-auto mb-3">
              <Col className="col-sm-auto" xs={6}>
                <CardText className="mb-0">Start Date</CardText>
                <CardText className="border rounded p-1 bg bg-light">{ startDate }</CardText>
              </Col>
              <Col className="col-sm-auto" xs={6}>
                <CardText className="mb-0">End Date</CardText>
                <CardText className="border rounded p-1 bg bg-light">{ endDate }</CardText>
              </Col>
            </Row>
            <h4>Lodging</h4>
            <Row className="mb-2">
              {
                lodges.map((lodge, index) => {
                  return (
                    <Col key={index} className="mb-2" md={6}>
                      <Card>
                        <CardHeader>{ lodge.locationAddress }</CardHeader>
                        <CardBody>
                          <CardText className="text-success">{`$${lodge.locationCost}`}</CardText>
                          <CardText>{ lodge.locationType }</CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
            <Row>
              <Col md={6}>
                <h4>Food</h4>
                <ConfirmationList items={ food } />
              </Col>
              <Col md={6}>
                <h4>Activities</h4>
                <ConfirmationList items={ activities } />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}
