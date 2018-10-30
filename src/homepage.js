import React, {Fragment} from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, Row, Col } from 'reactstrap'

export default function Homepage(props) {
  return (
    <Fragment>
      {
        props.events.map((item, index) => {
          return (
            <Col key={index} md={6}>
              <Card className="mb-3 shadow text-center">
                <CardBody>
                  <div className="bg bg-light border rounded py-3 px-2 mb-3">
                    <h2 className="font-weight-light">{item.eventName}</h2>
                    <CardSubtitle>{item.eventLocation}</CardSubtitle>
                  </div>
                  <CardText>{item.eventDescription}</CardText>
                  <Row className="d-flex justify-content-center mx-auto mb-3">
                    <Col className="col-sm-auto" xs={6}>
                      <CardText className="mb-0">Start Date</CardText>
                      <CardText className="border rounded p-1 bg bg-light">{item.startDate}</CardText>
                    </Col>
                    <Col className="col-sm-auto" xs={6}>
                      <CardText className="mb-0">End Date</CardText>
                      <CardText className="border rounded p-1 bg bg-light">{item.endDate}</CardText>
                    </Col>
                  </Row>
                  <Button color="primary px-5">Details</Button>
                </CardBody>
              </Card>
            </Col>
          )
        })
      }
    </Fragment>
  )
}
