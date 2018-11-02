import React from 'react'
import ConfirmationList from './util/confirmation-list'
import DeleteEvent from './modal-delete'
import { Card, CardHeader, CardText, CardBody, Row, Col } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '50rem',
    opacity: '0.9'
  },
  description: {
    maxWidth: '38rem'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { eventName, eventLocation, eventDescription, startDate, endDate, lodges, activities, food, id } = this.props.selectedEvent
    return (
      <div className="mx-2 mb-5">
        <Card className="container font-weight-light text-center px-0" style={ styles.width }>
          <CardHeader>
            <CardText className="font-weight-light" tag="h1">{ eventName }</CardText>
            <CardText><i className="fas fa-location-arrow mr-2"></i>{ eventLocation }</CardText>
          </CardHeader>
          <CardBody>
            <CardText className="mx-auto" style={ styles.description }>{ eventDescription }</CardText>
            <CardText tag="h4"><i className="fas fa-calendar-alt mr-2"></i>When</CardText>
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
            <CardText tag="h4"><i className="fas fa-home mr-2"></i>Lodging</CardText>
            <Row className="mb-2">
              {
                lodges.map((lodge, index) => {
                  return (
                    <Col key={index} className="mb-2" sm={6}>
                      <Card>
                        <CardHeader>{ lodge.locationAddress }</CardHeader>
                        <CardBody>
                          <Row className="d-flex justify-content-around">
                            <CardText className="text-success mb-0">{`Cost: $${lodge.locationCost}`}</CardText>
                            <CardText className="mb-0">{`Type: ${lodge.locationType}`}</CardText>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
            <Row>
              <Col sm={6}>
                <CardText tag="h4"><i className="fas fa-utensils mr-2"></i>Food</CardText>
                <ConfirmationList items={ food } />
              </Col>
              <Col sm={6}>
                <CardText tag="h4"><i className="fas fa-hiking mr-2"></i>Activities</CardText>
                <ConfirmationList items={ activities } />
              </Col>
            </Row>
            <DeleteEvent id={id}/>
          </CardBody>
        </Card>
      </div>
    )
  }
}
