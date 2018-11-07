import React from 'react'
import DeleteEvent from './modal-delete'
import { Badge, Button, Card, CardHeader, CardText, CardBody, CardFooter, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '50rem',
    opacity: '0.9'
  },
  description: {
    maxWidth: '38rem'
  },
  icon: {
    right: '2rem'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      activityModal: false,
      foodModal: false
    }
    this.removeEvent = this.removeEvent.bind(this)
    this.addLike = this.addLike.bind(this)
    this.removeListActivity = this.removeListActivity.bind(this)
    this.removeListFood = this.removeListFood.bind(this)
    this.removeLodge = this.removeLodge.bind(this)
    this.addLodge = this.addLodge.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggleActivity = this.toggleActivity.bind(this)
    this.toggleFood = this.toggleFood.bind(this)
    this.addActivity = this.addActivity.bind(this)
    this.addFood = this.addFood.bind(this)
  }
  toggle() {
    this.setState({modal: !this.state.modal})
  }
  toggleActivity() {
    this.setState({activityModal: !this.state.activityModal})
  }
  toggleFood() {
    this.setState({foodModal: !this.state.foodModal})
  }
  removeEvent(e) {
    const id = e.target.id
    this.props.deleteEvent(id)
  }
  addLike(e) {
    const { id, lodges } = this.props.selectedEvent
    const address = e.target.id
    const copyLodge = [...lodges]
    copyLodge.map(lodge => {
      return lodge.locationAddress === address ? lodge.like++ : lodge
    })
    const newLodges = Object.assign({}, {lodges: copyLodge})
    this.props.patchEvent(id, newLodges)
  }
  removeListActivity(e) {
    const { id, activities } = this.props.selectedEvent
    const oldList = [...activities]
    const listID = parseInt(e.target.id, 10)
    const filteredList = oldList.filter(item => listID !== item.id)
    const newList = Object.assign({}, {activities: filteredList})
    this.props.patchEvent(id, newList)
  }
  removeListFood(e) {
    const { id, food } = this.props.selectedEvent
    const oldList = [...food]
    const listID = parseInt(e.target.id, 10)
    const filteredList = oldList.filter(item => listID !== item.id)
    const newList = Object.assign({}, {food: filteredList})
    this.props.patchEvent(id, newList)
  }
  removeLodge(e) {
    const { id, lodges } = this.props.selectedEvent
    const oldLodges = [...lodges]
    const lodgeID = parseInt(e.target.id, 10)
    const filteredLodges = oldLodges.filter(lodge => lodgeID !== lodge.id)
    const newLodges = Object.assign({}, {lodges: filteredLodges})
    this.props.patchEvent(id, newLodges)
  }
  addLodge(e) {
    const { id, lodges } = this.props.selectedEvent
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      locationType: formData.get('type'),
      locationAddress: formData.get('address'),
      locationCost: formData.get('cost'),
      like: 0,
      id: lodges.length + 1
    }
    const newLodges = Object.assign({}, {lodges: [...lodges, data]})
    this.props.patchEvent(id, newLodges)
    this.toggle()
  }
  addActivity(e) {
    e.preventDefault()
    const { id, activities } = this.props.selectedEvent
    const formData = new FormData(e.target)
    const data = {
      value: formData.get('activity'),
      id: activities.length + 1
    }
    const newActivities = Object.assign({}, {activities: [...activities, data]})
    this.props.patchEvent(id, newActivities)
    this.toggleActivity()
  }
  addFood(e) {
    e.preventDefault()
    const { id, food } = this.props.selectedEvent
    const formData = new FormData(e.target)
    const data = {
      value: formData.get('food'),
      id: food.length + 1
    }
    const newFoodItems = Object.assign({}, {food: [...food, data]})
    this.props.patchEvent(id, newFoodItems)
    this.toggleFood()
  }
  render() {
    const { eventName, eventLocation, eventDescription, startDate, endDate, lodges, activities, food, id } = this.props.selectedEvent
    return (
      <div className="mx-2 mb-5">
        <Card className="container font-weight-light text-center px-0" style={ styles.width }>
          <CardHeader>
            <CardText className="font-weight-light" tag="h1">{ eventName }</CardText>
            <CardText><i className="fas fa-location-arrow mr-2 fa-sm"></i>{ eventLocation }</CardText>
          </CardHeader>
          <CardBody className="pb-3">
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
            <CardText tag="h4" className="mb-3"><i className="fas fa-home mr-2"></i>Lodging<i onClick={ this.toggle } className="far fa-plus-square fa-xs text-secondary ml-2"></i>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggle}>Add a new lodging option</ModalHeader>
                <Form autoComplete="off" onSubmit={ this.addLodge }>
                  <ModalBody>
                    <FormGroup>
                      <Label>Location Type</Label>
                      <Input name="type" placeholder="e.g. AirBnb, Hotel, etc." />
                    </FormGroup>
                    <FormGroup>
                      <Label>Address</Label>
                      <Input name="address" placeholder="e.g. 123 Address Drive" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Cost</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input name="cost" placeholder="e.g. $489" />
                      </InputGroup>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="info">Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Form>
              </Modal>
            </CardText>
            <Row className="d-flex justify-content-center mb-2">
              {
                lodges.map((lodge, index) => {
                  const likeStatus = lodge.like === 0 ? 'text-secondary' : 'text-info'
                  return (
                    <Col key={index} className="mb-2" sm={6}>
                      <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                          <Badge color="secondary">{ lodge.like }</Badge>
                          { lodge.locationAddress }
                          <i id={lodge.locationAddress}
                            className={`fas fa-thumbs-up ${likeStatus}`}
                            onClick={ this.addLike }>
                          </i>
                        </CardHeader>
                        <CardBody>
                          <Row className="d-flex justify-content-around">
                            <CardText className="text-success mb-0">{`Cost: $${lodge.locationCost}`}</CardText>
                            <CardText className="mb-0">{`Type: ${lodge.locationType}`}</CardText>
                          </Row>
                        </CardBody>
                        <CardFooter>
                          <i id={ lodge.id } onClick={ this.removeLodge } className="fas fa-minus-circle text-secondary float-right"></i>
                        </CardFooter>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
            <Row>
              <Col sm={6}>
                <CardText tag="h4"><i className="fas fa-utensils mr-2 mb-2"></i>Food<i onClick={ this.toggleFood } className="far fa-plus-square fa-xs text-secondary ml-2"></i></CardText>
                <Modal isOpen={this.state.foodModal} toggle={this.toggleFood} className="modal-dialog modal-dialog-centered">
                  <ModalHeader toggle={this.toggleFood}>Add a New Place To Eat/Dine</ModalHeader>
                  <Form autoComplete="off" onSubmit={ this.addFood }>
                    <ModalBody>
                      <FormGroup>
                        <Label>Food/Restaurant</Label>
                        <Input name="food" placeholder="e.g. Shake Shack" />
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="info">Add</Button>{' '}
                      <Button color="secondary" onClick={this.toggleFood}>Cancel</Button>
                    </ModalFooter>
                  </Form>
                </Modal>
                <Table className="border">
                  <tbody>
                    {
                      food.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="d-flex align-items-center justify-content-center">
                              { item.value }
                              <i
                                id={ item.id }
                                style={ styles.icon }
                                onClick={ this.removeListFood }
                                className="fas fa-times text-secondary position-absolute"></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
              <Col sm={6}>
                <CardText tag="h4"><i className="fas fa-hiking mr-2 mb-2"></i>Activities<i onClick={ this.toggleActivity } className="far fa-plus-square fa-xs text-secondary ml-2"></i></CardText>
                <Modal isOpen={this.state.activityModal} toggle={this.toggleActivity} className="modal-dialog modal-dialog-centered">
                  <ModalHeader toggle={this.toggleActivity}>Add a New Activity</ModalHeader>
                  <Form autoComplete="off" onSubmit={ this.addActivity }>
                    <ModalBody>
                      <FormGroup>
                        <Label>Activity</Label>
                        <Input name="activity" placeholder="e.g. Visit the capital" />
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="info">Add</Button>{' '}
                      <Button color="secondary" onClick={this.toggleActivity}>Cancel</Button>
                    </ModalFooter>
                  </Form>
                </Modal>
                <Table className="border">
                  <tbody>
                    {
                      activities.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="d-flex align-items-center justify-content-center">
                              { item.value }
                              <i
                                id={ item.id }
                                style={ styles.icon }
                                onClick={ this.removeListActivity }
                                className="fas fa-times text-secondary position-absolute"></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between">
              <Button href="#" className="ml-2">Back</Button>
              <DeleteEvent id={id} removeEvent={ this.removeEvent }/>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}
