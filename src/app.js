import React, {Fragment} from 'react'
import Navbar from './navbar'
import CreateEvent from './create-event'
import hash from './hash'
import { Card } from 'reactstrap'
import ShowCalendar from './calendar'
import Description from './description'
import Lodging from './lodging'
import Activities from './activities'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params },
      eventName: null,
      eventLocation: null,
      eventDescription: null,
      startDate: null,
      endDate: null,
      lodging: null
    }
    this.updateEvent = this.updateEvent.bind(this)
    this.renderApp = this.renderApp.bind(this)
  }
  renderApp() {
    const { view } = this.state
    if (view.params.step === 'description') {
      return (<Description update={ this.updateEvent } />)
    }
    if (view.params.step === 'date') {
      return (<ShowCalendar eventDate={ this.updateEvent }/>)
    }
    if (view.params.step === 'lodging') {
      return (<Lodging update={ this.updateEvent }/>)
    }
    if (view.params.step === 'activities') {
      return (<Activities/>)
    }
    else {
      return (<CreateEvent updateEvent={ this.updateEvent }/>)
    }
  }
  updateEvent(userInput) {
    const entries = Object.entries(userInput)
    entries.forEach(([key, value]) => {
      this.setState({ [key]: value })
    })
    const hashScreen = this.state.eventName === null ? 'create?step=description'
      : this.state.eventDescription === null ? 'create?step=date'
        : this.state.startDate === null ? 'create?step=lodging' : 'create?step=activities'
    location.hash = hashScreen
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
        <div className="mx-3 d-flex justify-content-center">
          <Card className="shadow rounded col-xl-6 col-lg-7 col-md-10 p-4">
            { this.renderApp() }
          </Card>
        </div>
      </Fragment>
    )
  }
}
