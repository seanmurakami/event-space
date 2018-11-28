import React, { Fragment } from 'react'
import DeleteEvent from './modal-delete'
import { Button, Card, CardHeader, CardText, CardBody, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Poll from './poll'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import LocationModal from './location-modal'
import DescriptionModal from './description-modal'
import DatesModal from './dates-modal'
import NameModal from './name-modal'
import AddLodge from './add-lodging-modal'
import RenderLodges from './render-lodges'
import FoodList from './food-list'
import ActivitiesList from './activities-list'
import PollModal from './poll-modal'
import VoteModal from './vote-modal'

const styles = {
  width: {
    maxWidth: '50rem',
    opacity: '0.9'
  },
  description: {
    maxWidth: '38rem'
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
                  <NameModal
                    editName={ this.state.editName }
                    toggleEventName={ this.toggleEventName }
                    updateEventName={ this.updateEventName }
                    eventName={ eventName }
                  />
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
                  <DatesModal
                    editDates={ this.state.editDates }
                    toggleEventDates={ this.toggleEventDates }
                    updateEventDates={ this.updateEventDates }
                    startDate={ this.state.startDate }
                    changeStart={ this.changeStart }
                    endDate={ this.state.endDate }
                    changeEnd={ this.changeEnd }
                  />
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
              <AddLodge
                modal={ this.state.modal }
                toggle={ this.toggle }
                addLodge={ this.addLodge }
              />
            </CardText>
            <Row className="d-flex justify-content-center mb-2">
              <RenderLodges
                lodges={ lodges }
                addLike={ this.addLike }
                removeLodge={ this.removeLodge }
              />
            </Row>
            <Row>
              <FoodList
                toggleFood={ this.toggleFood }
                foodModal={ this.state.foodModal }
                addFood={ this.addFood }
                food={ food }
                removeListFood={ this.removeListFood }
              />
              <ActivitiesList
                toggleActivity={ this.toggleActivity }
                activityModal={ this.state.activityModal }
                addActivity={ this.addActivity }
                activities={ activities }
                removeListActivity={ this.removeListActivity }
              />
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
              <PollModal
                pollModal={ this.state.pollModal }
                togglePoll={ this.togglePoll }
                updatePollItems={ this.updatePollItems }
                pollItems={ this.state.pollItems }
                submitPoll={ this.submitPoll }
              />
              <VoteModal
                voteModal={ this.state.voteModal }
                toggleVote={ this.toggleVote }
                submitVotes={ this.submitVotes }
                updateVote={ this.updateVote }
                data={ data }
              />
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
