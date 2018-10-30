import React, { Fragment } from 'react'
import Navbar from './navbar'
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
    maxWidth: '36rem',
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
      loading: true
    }
    this.updateEvent = this.updateEvent.bind(this)
    this.renderWizard = this.renderWizard.bind(this)
    this.addEvent = this.addEvent.bind(this)
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
        return (<Details />)
      default :
        return (
          <Row className="mx-auto">
            <Homepage events={this.state.events}/>
          </Row>
        )
    }
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
        events: [...this.state.events, newEvent]
      })
      )
  }
  updateEvent(userInput, param) {
    const eventInformation = Object.assign(this.state.eventInformation, userInput)
    this.setState({eventInformation})
    location.hash = `create?step=${param}`
  }
  componentDidMount() {
    fetch('/events')
      .then(res => res.json())
      .then(events => this.setState({events, loading: false}))
    window.addEventListener('hashchange', () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({view: { path, params }})
    })
  }
  render() {
    if (this.state.events.length === 0) {
      return (
        <Fragment>
          <Navbar />
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
          <Navbar />
          { this.renderHomepage() }
        </Fragment>
      )
    }
  }
}
