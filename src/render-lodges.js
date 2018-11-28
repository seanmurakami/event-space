import React from 'react'
import { Col, Card, CardHeader, Badge, CardBody, Row, CardText, CardFooter } from 'reactstrap'

export default class RenderLodges extends React.Component {
  render() {
    return (
      this.props.lodges.map((lodge, index) => {
        const likeStatus = lodge.like === 0 ? 'text-secondary' : 'text-info'
        return (
          <Col key={index} className="mb-2" sm={6}>
            <Card>
              <CardHeader className="d-flex align-items-center justify-content-between">
                <Badge color="secondary">{ lodge.like }</Badge>
                { lodge.locationAddress }
                <i id={lodge.locationAddress}
                  className={`fas fa-thumbs-up ${likeStatus}`}
                  onClick={ this.props.addLike }>
                </i>
              </CardHeader>
              <CardBody>
                <Row className="d-flex justify-content-around">
                  <CardText className="text-success mb-0">{`Cost: $${lodge.locationCost}`}</CardText>
                  <CardText className="mb-0">{`Type: ${lodge.locationType}`}</CardText>
                </Row>
              </CardBody>
              <CardFooter>
                <i id={ lodge.lookup } onClick={ this.props.removeLodge } className="fas fa-minus-circle text-secondary float-right"></i>
              </CardFooter>
            </Card>
          </Col>
        )
      })
    )
  }
}
