import React from 'react'
import { Card, CardHeader, CardText, CardBody, Row, Col, Table } from 'reactstrap'

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
    return (
      <div className="mx-2">
        <Card className="container px-0" style={ styles.width }>
          <CardHeader>
            <CardText tag="h1">My Event</CardText>
            <CardText>Los Angeles, CA</CardText>
          </CardHeader>
          <CardBody>
            <h4>When</h4>
            <Row className="d-flex justify-content-center mx-auto mb-3">
              <Col className="col-sm-auto" xs={6}>
                <CardText className="mb-0">Start Date</CardText>
                <CardText className="border rounded p-1 bg bg-light">10/31/2018</CardText>
              </Col>
              <Col className="col-sm-auto" xs={6}>
                <CardText className="mb-0">End Date</CardText>
                <CardText className="border rounded p-1 bg bg-light">10/31/2018</CardText>
              </Col>
            </Row>
            <h4>Lodging</h4>
            <Row className="mb-2">
              <Col className="mb-2" md={6}>
                <Card>
                  <CardHeader>123 Address Street</CardHeader>
                  <CardBody>
                    <CardText className="text-success">$123</CardText>
                    <CardText>AirBnb</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <CardHeader>123 Address Street</CardHeader>
                  <CardBody>
                    <CardText>$123</CardText>
                    <CardText>AirBnb</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h4>Food</h4>
                <Table className="border">
                  <tbody>
                    <tr key={1}>
                      <td>Burger King</td>
                    </tr>
                    <tr key={2}>
                      <td>Philz Coffee</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h4>Activities</h4>
                <Table className="border">
                  <tbody>
                    <tr key={1}>
                      <td>Go Hiking</td>
                    </tr>
                    <tr key={2}>
                      <td>Walk the beach</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}
