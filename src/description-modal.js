import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'

export default class DescriptionModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.editDescription} toggle={this.props.toggleEventDescription}>
        <ModalHeader toggle={this.props.toggleEventDescription}>Edit Event Location</ModalHeader>
        <Form onSubmit={ this.props.updateEventDescription }>
          <ModalBody>
            <FormGroup>
              <Label>Event Location</Label>
              <Input name="event-location" defaultValue={this.props.eventDescription} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Update</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleEventDescription}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
