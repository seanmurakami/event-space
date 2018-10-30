import React from 'react'
import { Card, CardHeader, CardText, CardBody, Row, Col, Table } from 'reactstrap'

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Card>
        <CardHeader tag="h3">My Event</CardHeader>
        <CardText>Los Angeles, CA</CardText>
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
          <Row className="mb-2 text-center">
            <Col md={6}>
              <Card>
                <CardHeader>123 Address Street</CardHeader>
                <CardBody>
                  <CardText>$123</CardText>
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
    )
  }
}
