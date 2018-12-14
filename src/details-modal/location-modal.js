import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'
import PlacesAutocomplete from 'react-places-autocomplete'

export default class LocationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.eventLocation
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(address) {
    return this.setState({ address })
  }
  render() {
    return (
      <Modal isOpen={this.props.editLocation} toggle={this.props.toggleEventLocation}>
        <ModalHeader toggle={this.props.toggleEventLocation}>Edit Event Location</ModalHeader>
        <Form onSubmit={ this.props.updateEventLocation }>
          <ModalBody>
            <FormGroup>
              <Label>Event Location</Label>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleChange}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <Input
                      name="event-location"
                      {...getInputProps()}
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
          </ModalBody>
          <ModalFooter>
            <Button color="info">Update</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleEventLocation}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
