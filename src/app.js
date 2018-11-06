import React, { Fragment } from 'react'
import EventsNavbar from './navbar'
import CreateEvent from './wizard/create-event'
import hash from './util/hash'
import ShowCalendar from './wizard/calendar'
import Description from './wizard/description'
import Lodging from './wizard/lodging'
import CreateList from './wizard/create-list'
import Confirmation from './wizard/confirmation'
import Homepage from './homepage'
import Loading from './util/loading'
import Details from './details'
import { Card, Row } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '44rem',
    opacity: '0.91'
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params },
      eventInformation: {},
      events: [],
      loading: true,
      selectedEvent: null,
      newEvent: false
    }
    this.updateEvent = this.updateEvent.bind(this)
    this.renderWizard = this.renderWizard.bind(this)
    this.addEvent = this.addEvent.bind(this)
    this.updateDetails = this.updateDetails.bind(this)
    this.newEvent = this.newEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.addLike = this.addLike.bind(this)
  }
  renderWizard() {
    const { view } = this.state
    switch (view.params.step) {
      case 'description' :
        return (<Description update={ this.updateEvent } />)
      case 'date' :
        return (<ShowCalendar eventDate={ this.updateEvent }/>)
      case 'lodging' :
        return (<Lodging update={ this.updateEvent }/>)
      case 'activities' :
        return (<CreateList
          name="activities"
          header="Add Events/Activities"
          label="Event/Activity"
          placeholder="e.g. Walk the Great Wall of China"
          location="lodging"
          update={ this.updateEvent }/>)
      case 'food' :
        return (<CreateList
          name="food"
          header="Create a list of restaurants!"
          label="Restaurant"
          placeholder="e.g. Burger King"
          location="activities"
          update={ this.updateEvent }/>)
      case 'confirmation' :
        return (
          <Confirmation eventInformation={ this.state.eventInformation } update={ this.addEvent }/>
        )
      default :
        return this.state.loading ? <Loading /> : <CreateEvent updateEvent={ this.updateEvent }/>
    }
  }
  renderHomepage() {
    const { view } = this.state
    switch (view.path) {
      case 'details' :
        return (
          <Details
            selectedEvent={ this.state.selectedEvent }
            deleteEvent={ this.deleteEvent }
            addLike={ this.addLike }
            updateList={ this.addLike }
          />)
      default :
        return (
          <Row className="d-flex justify-content-center mx-auto">
            <Homepage updateDetails={ this.updateDetails } events={this.state.events}/>
          </Row>
        )
    }
  }
  updateDetails(eventID) {
    const [selectedEvent] = this.state.events.filter(item => item.id === parseInt(eventID, 10))
    this.setState({selectedEvent})
  }
  addEvent(event) {
    location.hash = '#'
    return fetch('/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(newEvent => this.setState({
        events: [...this.state.events, newEvent],
        newEvent: false
      })
      )
  }
  updateEvent(userInput, param) {
    const eventInformation = Object.assign(this.state.eventInformation, userInput)
    this.setState({eventInformation})
    location.hash = `create?step=${param}`
  }
  deleteEvent(id) {
    location.hash = '#'
    return fetch(`/events/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(() => {
        const { events } = this.state
        const newEvents = [...events]
        const eventIndex = newEvents.findIndex(item => item.id === parseInt(id, 10))
        newEvents.splice(eventIndex, 1)
        return this.setState({events: newEvents})
      })
  }
  newEvent() {
    this.setState({newEvent: true})
  }
  addLike(id, updatedLodges) {
    return fetch(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedLodges),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(item => {
        const { events } = this.state
        const newEvents = [...events]
        const eventIndex = newEvents.findIndex(element => element.id === item.id)
        newEvents.splice(eventIndex, 1, item)
        return this.setState({events: newEvents, selectedEvent: item})
      })
  }
  componentDidMount() {
    fetch('/events')
      .then(res => res.json())
      .then(events => {
        const [selectedEvent] = events.filter(item => item.id === parseInt(this.state.view.params.event, 10) || null)
        this.setState({events, selectedEvent, loading: false})
      })
    window.addEventListener('hashchange', () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({view: { path, params }})
    })
  }
  render() {
    if (this.state.newEvent || this.state.events.length === 0) {
      return (
        <Fragment>
          <EventsNavbar />
          <div className="d-flex justify-content-center mx-3 mb-4">
            <Card style={ styles.width } className="shadow rounded bg bg-light w-100 p-4">
              { this.renderWizard() }
            </Card>
          </div>
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <EventsNavbar update={ this.newEvent }/>
          { this.renderHomepage() }
        </Fragment>
      )
    }
  }
}
