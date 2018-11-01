import React, {Fragment} from 'react'
import ConfirmationList from './util/confirmation-list'
import Poll from './poll'
import { Button, Card, CardHeader, CardText, CardBody, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Table, Input } from 'reactstrap'

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
    this.state = {
      modal: false,
      pollItems: []
    }
    this.toggle = this.toggle.bind(this)
    this.updatePollItems = this.updatePollItems.bind(this)
    this.submitPoll = this.submitPoll.bind(this)
  }
  toggle() {
    this.setState({modal: !this.state.modal})
  }
  updatePollItems(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const pollItem = formData.get('poll')
    this.setState({pollItems: [...this.state.pollItems, pollItem]})
    e.target.reset()
  }
  submitPoll() {
    const content = {
      data: this.state.pollItems
    }
    this.props.poll(content, this.props.selectedEvent.id)
  }
  render() {
    const { eventName, eventLocation, eventDescription, startDate, endDate, lodges, activities, food, data } = this.props.selectedEvent
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
            <Row className="mb-2 d-flex justify-content-center">
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
            <Row className="mb-2">
              <Poll data={ data }/>
            </Row>
            <Row className="d-flex justify-content-between mx-2">
              <Button href="#">Exit</Button>
              <Button onClick={ this.toggle } color="info">Create Poll</Button>
              <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
                <ModalHeader toggle={ this.toggle }>Create a list of poll items</ModalHeader>
                <ModalBody>
                  <Form onSubmit={ this.updatePollItems } autoComplete="off">
                    <FormGroup>
                      <Col>
                        <div className="input-group">
                          <Input name="poll" placeholder="What are we voting on?" />
                          <div className="input-group-append">
                            <Button color="link">+</Button>
                          </div>
                        </div>
                      </Col>
                    </FormGroup>
                    <Fragment>
                      { this.state.pollItems.length !== 0 &&
                      <Table style={ styles.width } className="border mx-auto">
                        <tbody>
                          { this.state.pollItems.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{ item }</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                      }
                    </Fragment>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={ this.submitPoll } color="info">Submit</Button>
                </ModalFooter>
              </Modal>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}
