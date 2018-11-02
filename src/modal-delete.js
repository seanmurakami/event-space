import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

export default class DeleteEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({modal: !this.state.modal})
  }
  render() {
    return (
      <div>
        <i onClick={ this.toggle } id={this.props.id} className="fas fa-trash-alt fa-lg float-right mt-2 text-secondary"></i>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Event</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this event?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
