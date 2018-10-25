import React, { Fragment } from 'react'
import Navbar from './navbar'
import CreateEvent from './wizard/create-event'
import hash from './hash'
import { Card } from 'reactstrap'
import ShowCalendar from './wizard/calendar'
import Description from './wizard/description'
import Lodging from './wizard/lodging'
import CreateList from './wizard/create-list'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params }
    }
    this.updateEvent = this.updateEvent.bind(this)
    this.renderApp = this.renderApp.bind(this)
  }
  renderApp() {
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
      default :
        return (<CreateEvent updateEvent={ this.updateEvent }/>)
    }
  }
  updateEvent(userInput, param) {
    this.setState(userInput)
    location.hash = `create?step=${param}`
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({view: { path, params }})
    })
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="mx-3 d-flex justify-content-center mb-4">
          <Card className="shadow rounded col-xl-6 col-lg-7 col-md-10 p-4">
            { this.renderApp() }
          </Card>
        </div>
      </Fragment>
    )
  }
}
