import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'

export default class DescriptionModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.editDescription} toggle={this.props.toggleEventDescription}>
        <ModalHeader toggle={this.props.toggleEventDescription}>Edit Event Description</ModalHeader>
        <Form onSubmit={ this.props.updateEventDescription }>
          <ModalBody>
            <FormGroup>
              <Label>Event Description</Label>
              <textarea name="event-description" rows="4" defaultValue={this.props.eventDescription} className="form-control" />
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
