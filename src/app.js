import React, { Fragment } from 'react'
import Navbar from './navbar'
import CreateEvent from './wizard/create-event'
import hash from './util/hash'
import { Card } from 'reactstrap'
import ShowCalendar from './wizard/calendar'
import Description from './wizard/description'
import Lodging from './wizard/lodging'
import CreateList from './wizard/create-list'
import Confirmation from './wizard/confirmation'

const styles = {
  width: {
    maxWidth: '52rem'
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params },
      userInfo: {}
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
      case 'confirmation' :
        return (
          <Confirmation state={ this.state.userInfo }/>
        )
      default :
        return (<CreateEvent updateEvent={ this.updateEvent }/>)
    }
  }
  updateEvent(userInput, param) {
    const userInfo = Object.assign(this.state.userInfo, userInput)
    this.setState({userInfo})
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
          <Card style={ styles.width } className="shadow rounded w-100 p-4">
            { this.renderApp() }
          </Card>
        </div>
      </Fragment>
    )
  }
}
