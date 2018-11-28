import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'

export default class NameModal extends React.Component {
  render() {
    return (
      <Modal isOpen={ this.props.editName } toggle={ this.props.toggleEventName }>
        <ModalHeader toggle={ this.props.toggleEventName }>Edit Event Name</ModalHeader>
        <Form onSubmit={ this.props.updateEventName }>
          <ModalBody>
            <FormGroup>
              <Label>Event Name</Label>
              <Input name="event-name" defaultValue={ this.props.eventName } />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Update</Button>{' '}
            <Button color="secondary" onClick={ this.props.toggleEventName }>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
