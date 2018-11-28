import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default class AddLodge extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-dialog modal-dialog-centered">
        <ModalHeader toggle={this.props.toggle}>Add a new lodging option</ModalHeader>
        <Form autoComplete="off" onSubmit={ this.props.addLodge }>
          <ModalBody>
            <FormGroup>
              <Label>Location Type</Label>
              <Input name="type" placeholder="e.g. AirBnb, Hotel, etc." />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input name="address" placeholder="e.g. 123 Address Drive" />
            </FormGroup>
            <FormGroup>
              <Label>Cost</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input name="cost" placeholder="e.g. $489" />
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Add</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
