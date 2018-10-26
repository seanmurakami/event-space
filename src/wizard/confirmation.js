import React, { Fragment } from 'react'
import { Button, Row, Col, Table } from 'reactstrap'

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { eventLocation, eventName, eventDescription, startDate, endDate, lodges, activities, food } = this.props.eventInformation
    return (
      <Fragment>
        <div className="text-center mb-2">
          <h1>{ eventName }</h1>
          <h5>{ eventLocation }</h5>
        </div>
        <Row>
          <h5>Description:</h5>
          <p>{!!eventDescription !== false && eventDescription }</p>
        </Row>
        <Row>
          <h5>When:</h5>
          <p>{`Start Date: ${startDate.months}/${startDate.date}/${startDate.years}`}</p>
          <p>{`End Date: ${endDate.months}/${endDate.date}/${endDate.years}`}</p>
        </Row>
        <h5>Lodging</h5>
        <Row>
          {
            Object.keys(lodges).length !== 0 &&
            lodges.map((lodge, index) => {
              return (
                <Col md={6} key={index}>
                  <p>{`Type: ${lodge.locationType}`}</p>
                  <p>{`Address: ${lodge.locationAddress}`}</p>
                  <p>{`Cost: $${lodge.locationCost}`}</p>
                </Col>
              )
            })
          }
        </Row>
        <Row>
          <Col>
            <h5>Food</h5>
            <Table className="mt-2 border">
              <thead>
                <tr>
                  <th>Food</th>
                </tr>
              </thead>
              <tbody>
                {
                  food.length !== 0 &&
                  food.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{ item }</td>
                      </tr>
                    )
                  })
                }
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
                {
                  activities.length !== 0 &&
                  activities.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{ item }</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button color="primary">Confirm</Button>
      </Fragment>
    )
  }
}
