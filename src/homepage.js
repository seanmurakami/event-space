import React, { Fragment } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText } from 'reactstrap'

export default function Homepage(props) {
  return (
    <Fragment>
      {
        props.events.map((item, index) => {
          return (
            <Card key={index} className="mx-3 mb-3 shadow text-center">
              <CardBody>
                <div className="bg bg-light border rounded p-3 mb-3">
                  <h2 className="font-weight-light">{item.eventName}</h2>
                  <CardSubtitle>{item.eventLocation}</CardSubtitle>
                </div>
                <CardText>{item.eventDescription}</CardText>
                <Button>Details</Button>
              </CardBody>
            </Card>)
        })
      }
    </Fragment>
  )
}
