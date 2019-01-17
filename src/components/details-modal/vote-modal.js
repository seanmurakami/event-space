import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'

export default class VoteModal extends React.Component {
  render() {
    return (
      <Modal isOpen={ this.props.voteModal } toggle={ this.props.toggleVote } className="modal-dialog modal-dialog-centered">
        <ModalHeader toggle={ this.props.toggleVote }>Vote on Poll Item</ModalHeader>
        <Form onSubmit={ this.props.submitVotes }>
          <ModalBody>
            <FormGroup>
              {
                this.props.data.map((pollItem, index) => {
                  return (
                    <FormGroup check key={index} className="my-2">
                      <Label check>
                        <Input id={index} onClick={ this.props.updateVote } type="checkbox"/>{ pollItem.item }
                      </Label>
                    </FormGroup>
                  )
                })
              }
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Vote</Button>{' '}
            <Button color="secondary" onClick={ this.props.toggleVote }>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
