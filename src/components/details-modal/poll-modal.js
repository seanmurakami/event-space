import React, { Fragment } from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Col, Table } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '50rem',
    opacity: '0.9'
  }
}

export default class PollModal extends React.Component {
  render() {
    return (
      <Modal isOpen={ this.props.pollModal } toggle={ this.props.togglePoll }>
        <ModalHeader toggle={ this.props.togglePoll }>Create a list of poll items that you can vote on!</ModalHeader>
        <ModalBody>
          <Form onSubmit={ this.props.updatePollItems } autoComplete="off">
            <FormGroup>
              <Col>
                <div className="input-group">
                  <Input name="poll" placeholder="Create items to vote on" />
                  <div className="input-group-append">
                    <Button color="link">+</Button>
                  </div>
                </div>
              </Col>
            </FormGroup>
            <Fragment>
              { this.props.pollItems.length !== 0 &&
              <Table style={ styles.width } className="border mx-auto">
                <tbody>
                  { this.props.pollItems.map((pollitem, index) => {
                    return (
                      <tr key={index}>
                        <td>{ pollitem.item }</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              }
            </Fragment>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={ this.props.submitPoll } color="info">Submit</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
