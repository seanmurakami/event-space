import React, { Fragment } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
    this.userInput = this.userInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleChange(address) {
    return this.setState({ address })
  }
  handleSelect(address) {
    return this.setState({address})
  }
  userInput(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = {
      eventName: formData.get('event-name'),
      eventLocation: formData.get('event-location')
    }
    if (!userData.eventName || !userData.eventLocation) {
      alert('Please enter an event name and location.')
    }
    else {
      this.props.updateEvent(userData, 'description')
    }
  }
  render() {
    return (
      <Fragment>
        <h3 className="font-weight-light text-center">Create An Event!</h3>
        <Form autoComplete="off" onSubmit={ this.userInput }>
          <FormGroup>
            <Label>Event Name</Label>
            <Input name="event-name" placeholder="Input event name" />
          </FormGroup>
          <FormGroup>
            <Label>Event Location</Label>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Input
                    name="event-location"
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item'
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' }
                      return (
                        <div
                          key = { index }
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button className="w-50" color="info">Continue</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}
