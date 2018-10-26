import React, { Fragment } from 'react'
import { Button, Row, Col, Table } from 'reactstrap'

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <div className="text-center mb-2">
          <h2>My Crazy Event!!!</h2>
          <h5>Los Angeles, CA</h5>
        </div>
        <div>
          <h5>Description:</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div>
          <h5>When:</h5>
          <p>Start Date: 02/10/2018</p>
          <p>End Date: 02/15/2018</p>
        </div>
        <Row>
          <Col>
            <h5>Lodging</h5>
            <p>Address: 123 Address Street</p>
            <p>Cost: $560</p>
            <p>URL: http://mylodging.com/1232132</p>
          </Col>
          <Col md={6}>
            <h5>Lodging</h5>
            <p>Address: 123 Address Street</p>
            <p>Cost: $560</p>
            <p>URL: http://mylodging.com/1232132</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Food</h5>
            <Table className="mt-2 border">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Address</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr key={1}>
                  <td>AirBnb</td>
                  <td>123 Address St</td>
                  <td>$679</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h5>Activities</h5>
            <Table className="border">
              <thead>
                <tr>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hike the tallest mountain</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button color="primary">Confirm</Button>
      </Fragment>
    )
  }
}
