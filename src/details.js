import React, { Fragment } from 'react'
import DeleteEvent from './modal-delete'
import { Badge, Button, Card, CardHeader, CardText, CardBody, CardFooter, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Poll from './poll'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import LocationModal from './location-modal'
import DescriptionModal from './description-modal'

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
  },
  dropdown: {
    right: '1rem'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      activityModal: false,
      foodModal: false,
      dropDownOpen: false,
      editName: false,
      editLocation: false,
      editDescription: false,
      editDates: false,
      pollModal: false,
      voteModal: false,
      startDate: moment(this.props.selectedEvent.startDate, 'MM-DD-YYYY'),
      endDate: moment(this.props.selectedEvent.endDate, 'MM-DD-YYYY'),
      pollItems: [],
      votes: []
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
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.toggleEventName = this.toggleEventName.bind(this)
    this.toggleEventLocation = this.toggleEventLocation.bind(this)
    this.updateEventName = this.updateEventName.bind(this)
    this.updateEventLocation = this.updateEventLocation.bind(this)
    this.toggleEventDescription = this.toggleEventDescription.bind(this)
    this.toggleEventDates = this.toggleEventDates.bind(this)
    this.updateEventDescription = this.updateEventDescription.bind(this)
    this.changeStart = this.changeStart.bind(this)
    this.changeEnd = this.changeEnd.bind(this)
    this.updateEventDates = this.updateEventDates.bind(this)
    this.togglePoll = this.togglePoll.bind(this)
    this.updatePollItems = this.updatePollItems.bind(this)
    this.submitPoll = this.submitPoll.bind(this)
    this.toggleVote = this.toggleVote.bind(this)
    this.updateVote = this.updateVote.bind(this)
    this.submitVotes = this.submitVotes.bind(this)
    this.removePoll = this.removePoll.bind(this)
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
  toggleDropdown() {
    this.setState(prevState => ({dropDownOpen: !prevState.dropDownOpen}))
  }
  toggleEventName() {
    this.setState({editName: !this.state.editName})
  }
  toggleEventLocation() {
    this.setState({editLocation: !this.state.editLocation})
  }
  toggleEventDescription() {
    this.setState({editDescription: !this.state.editDescription})
  }
  toggleEventDates() {
    this.setState({editDates: !this.state.editDates})
  }
  togglePoll() {
    this.setState({pollModal: !this.state.pollModal})
  }
  toggleVote() {
    this.setState({voteModal: !this.state.voteModal})
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
    const filteredList = oldList.filter(item => listID !== item.lookup)
    const newList = Object.assign({}, {activities: filteredList})
    this.props.patchEvent(id, newList)
  }
  removeListFood(e) {
    const { id, food } = this.props.selectedEvent
    const oldList = [...food]
    const listID = parseInt(e.target.id, 10)
    const filteredList = oldList.filter(item => listID !== item.lookup)
    const newList = Object.assign({}, {food: filteredList})
    this.props.patchEvent(id, newList)
  }
  removeLodge(e) {
    const { id, lodges } = this.props.selectedEvent
    const oldLodges = [...lodges]
    const lodgeID = parseInt(e.target.id, 10)
    const filteredLodges = oldLodges.filter(lodge => lodgeID !== lodge.lookup)
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
      lookup: lodges.length + 1
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
      lookup: activities.length + 1
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
      lookup: food.length + 1
    }
    const newFoodItems = Object.assign({}, {food: [...food, data]})
    this.props.patchEvent(id, newFoodItems)
    this.toggleFood()
  }
  updateEventName(e) {
    e.preventDefault()
    const { id } = this.props.selectedEvent
    const formData = new FormData(e.target)
    const data = {
      eventName: formData.get('event-name')
    }
    this.props.patchEvent(id, data)
    this.toggleEventName()
  }
  updateEventLocation(e) {
    e.preventDefault()
    const { id } = this.props.selectedEvent
    const formData = new FormData(e.target)
    const data = {
      eventLocation: formData.get('event-location')
    }
    this.props.patchEvent(id, data)
    this.toggleEventLocation()
  }
  updateEventDescription(e) {
    e.preventDefault()
    const { id } = this.props.selectedEvent
    const formData = new FormData(e.target)
    const data = {
      eventDescription: formData.get('event-description')
    }
    this.props.patchEvent(id, data)
    this.toggleEventDescription()
  }
  updateEventDates() {
    const { id } = this.props.selectedEvent
    const { startDate, endDate } = this.state
    const userInfo = Object.assign({}, {startDate}, {endDate})
    const updateDates = Object.values(userInfo).map(moment => moment.format('MM/DD/YYYY'))
    this.props.patchEvent(id, {
      startDate: updateDates[0],
      endDate: updateDates[1]
    })
    this.toggleEventDates()
  }
  changeStart(date) {
    this.setState({startDate: date})
  }
  changeEnd(date) {
    this.setState({endDate: date})
  }
  updatePollItems(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const pollItem = formData.get('poll')
    const data = {
      item: pollItem,
      votes: 0
    }
    this.setState({pollItems: [...this.state.pollItems, data]})
    e.target.reset()
  }
  submitPoll() {
    const content = {
      data: this.state.pollItems
    }
    this.props.poll(content, this.props.selectedEvent.id)
    this.togglePoll()
  }
  updateVote(e) {
    const votes = [...this.props.selectedEvent.data]
    votes[e.target.id].votes++
    this.setState({votes})
  }
  submitVotes() {
    const { id } = this.props.selectedEvent
    const updatePollItems = [...this.state.votes]
    const votes = {data: updatePollItems}
    const newVotes = Object.assign({}, votes)
    this.props.patchEvent(id, newVotes)
    this.toggleVote()
  }
  removePoll() {
    const { id } = this.props.selectedEvent
    this.props.patchEvent(id, {data: []})
  }
  render() {
    const { eventName, eventLocation, eventDescription, startDate, endDate, lodges, activities, food, id, data } = this.props.selectedEvent
    const pollButton = data.length === 0 ? <Button onClick={ this.togglePoll } color="info">Create Poll</Button> : null
    return (
      <div className="mx-2 mb-5">
        <Card className="container font-weight-light text-center px-0" style={ styles.width }>
          <CardHeader>
            <CardText className="font-weight-light" tag="h1">{ eventName }</CardText>
            <Row className="d-flex justify-content-center">
              <CardText className="mb-0"><i className="fas fa-location-arrow mr-2 fa-sm"></i>{ eventLocation }</CardText>
              <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggleDropdown} size="sm" className="position-absolute" style={ styles.dropdown }>
                <DropdownToggle data-toggle="dropdown" tag="span">
                  <i className="fas fa-ellipsis-h"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggleEventName}>Edit Title</DropdownItem>
                  <Modal isOpen={this.state.editName} toggle={this.toggleEventName}>
                    <ModalHeader toggle={this.toggleEventName}>Edit Event Name</ModalHeader>
                    <Form onSubmit={ this.updateEventName }>
                      <ModalBody>
                        <FormGroup>
                          <Label>Event Name</Label>
                          <Input name="event-name" defaultValue={eventName} />
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="info">Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEventName}>Cancel</Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <DropdownItem id="location" onClick={this.toggleEventLocation}>Edit Location</DropdownItem>
                  <LocationModal
                    editLocation={ this.state.editLocation }
                    toggleEventLocation={ this.toggleEventLocation }
                    updateEventLocation={ this.updateEventLocation }
                    eventLocation={ eventLocation }
                  />
                  <DropdownItem onClick={this.toggleEventDescription}>Edit Description</DropdownItem>
                  <DescriptionModal
                    editDescription={ this.state.editDescription }
                    toggleEventDescription={ this.toggleEventDescription }
                    updateEventDescription={ this.updateEventDescription }
                    eventDescription={ eventDescription }
                  />
                  <DropdownItem onClick={this.toggleEventDates}>Edit Dates</DropdownItem>
                  <Modal isOpen={this.state.editDates} toggle={this.toggleEventDates}>
                    <ModalHeader toggle={this.toggleEventDates}>Edit Event Dates</ModalHeader>
                    <Form onSubmit={() => this.updateEventDates()}>
                      <ModalBody>
                        <FormGroup className="text-center">
                          <Row>
                            <Col>
                              <Label>Start Date</Label>
                              <DatePicker
                                className="text-center"
                                selected={this.state.startDate}
                                onChange={this.changeStart}
                              />
                            </Col>
                            <Col>
                              <Label>End Date</Label>
                              <DatePicker
                                className="text-center"
                                selected={this.state.endDate}
                                onChange={this.changeEnd}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="info">Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEventDates}>Cancel</Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                </DropdownMenu>
              </Dropdown>
            </Row>
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
                          <i id={ lodge.lookup } onClick={ this.removeLodge } className="fas fa-minus-circle text-secondary float-right"></i>
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
                                id={ item.lookup }
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
                                id={ item.lookup }
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
            {
              data.length !== 0 &&
                  <Fragment>
                    <CardBody>
                      <CardText tag="h4"><i className="fas fa-poll-h mr-2 mb-2"></i>Poll</CardText>
                      <Row className="d-flex justify-content-center mb-2">
                        <Poll
                          data={ data }
                          toggleVote={ this.toggleVote }
                          removePoll={ this.removePoll } />
                      </Row>
                    </CardBody>
                  </Fragment>
            }
            <Row className="d-flex justify-content-center mx-2">
              {pollButton}
              <Modal isOpen={ this.state.pollModal } toggle={ this.togglePoll }>
                <ModalHeader toggle={ this.togglePoll }>Create a list of poll items</ModalHeader>
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
                          { this.state.pollItems.map((pollitem, index) => {
                            return (
                              <tr key={index}>
                                <td>{ pollitem.item }</td>
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
              <Modal isOpen={this.state.voteModal} toggle={this.toggleVote} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggleVote}>Vote on Poll Item</ModalHeader>
                <Form onSubmit={this.submitVotes}>
                  <ModalBody>
                    <FormGroup>
                      {
                        data.map((pollItem, index) => {
                          return (
                            <FormGroup check key={index} className="my-2">
                              <Label check>
                                <Input id={index} onClick={this.updateVote} type="checkbox"/>{pollItem.item}
                              </Label>
                            </FormGroup>
                          )
                        })
                      }
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="info">Vote</Button>{' '}
                    <Button color="secondary" onClick={this.toggleVote}>Cancel</Button>
                  </ModalFooter>
                </Form>
              </Modal>
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
