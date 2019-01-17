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
      <div className="mr-2">
        <i onClick={ this.toggle } className="fas fa-trash-alt fa-lg float-right mt-2 text-secondary"></i>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Event</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this event?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" id={ this.props.id } onClick={ this.props.removeEvent }>Yes</Button>{' '}
            <Button color="secondary" onClick={ this.toggle }>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
