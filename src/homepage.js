import React, {Fragment} from 'react'
import { Button, Card, CardBody, CardText, Row, Col } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '29em'
  }
}

export default function Homepage(props) {
  function updateState(e) {
    const { id } = e.target
    props.updateDetails(id)
  }
  return (
    <Fragment>
      {
        props.events.map((item, index) => {
          return (
            <Col key={index} md={6}>
              <Card className="mb-3 text-center font-weight-light shadow">
                <CardBody>
                  <div className="bg bg-light border rounded py-3 px-2 mb-3">
                    <h3 className="font-weight-light">{item.eventName}</h3>
                    <CardText className="font-weight-light"><i className="fas fa-location-arrow fa-sm mr-2"></i>{item.eventLocation}</CardText>
                  </div>
                  <CardText style={ styles.width } className="mx-auto">{item.eventDescription}</CardText>
                  <Row className="d-flex justify-content-center mx-auto mb-3">
                    <Col className="col-sm-auto" xs={6}>
                      <CardText className="mb-1">Start Date</CardText>
                      <CardText className="border rounded p-1 bg bg-light">{item.startDate}</CardText>
                    </Col>
                    <Col className="col-sm-auto" xs={6}>
                      <CardText className="mb-1">End Date</CardText>
                      <CardText className="border rounded p-1 bg bg-light">{item.endDate}</CardText>
                    </Col>
                  </Row>
                  <Button href={`#details?event=${item.id}`} id={item.id} onClick={updateState} color="info px-5">Details</Button>
                </CardBody>
              </Card>
            </Col>
          )
        })
      }
    </Fragment>
  )
}
