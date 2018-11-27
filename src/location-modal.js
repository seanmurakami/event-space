import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'

export default class LocationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Modal isOpen={this.props.editLocation} toggle={this.props.toggleEventLocation}>
        <ModalHeader toggle={this.props.toggleEventLocation}>Edit Event Location</ModalHeader>
        <Form onSubmit={ this.props.updateEventLocation }>
          <ModalBody>
            <FormGroup>
              <Label>Event Location</Label>
              <Input name="event-location" defaultValue={this.props.eventLocation} />
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
