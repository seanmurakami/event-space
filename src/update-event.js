import React from 'react'

export default class UpdateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.updateEvent = this.updateEvent.bind(this)
  }
  updateEvent(e) {
    e.preventDefault()
    const { id } = this.props.selectedEvent
    const formData = new FormData(e.target)
    const data = {
      eventName: formData.get(this.props.eventType)
    }
    this.props.patchEvent(id, data)
    this.toggleEventName()
  }
  render() {
    return 'hello'
  }
}
