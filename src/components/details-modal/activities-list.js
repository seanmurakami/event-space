import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, CardText, Input, Table } from 'reactstrap'

const styles = {
  icon: {
    right: '2rem'
  }
}

export default class ActivitiesList extends React.Component {
  render() {
    return (
      <Col sm={6}>
        <CardText tag="h4"><i className="fas fa-hiking mr-2 mb-2"></i>Activities<i onClick={ this.props.toggleActivity } className="far fa-plus-square fa-xs text-secondary ml-2"></i></CardText>
        <Modal isOpen={ this.props.activityModal } toggle={ this.props.toggleActivity } className="modal-dialog modal-dialog-centered">
          <ModalHeader toggle={ this.props.toggleActivity }>Add a New Activity</ModalHeader>
          <Form autoComplete="off" onSubmit={ this.props.addActivity }>
            <ModalBody>
              <FormGroup>
                <Label>Activity</Label>
                <Input name="activity" placeholder="e.g. Visit the capital" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="info">Add</Button>{' '}
              <Button color="secondary" onClick={ this.props.toggleActivity }>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Table className="border">
          <tbody>
            {
              this.props.activities.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="d-flex align-items-center justify-content-center">
                      { item.value }
                      <i
                        id={ item.lookup }
                        style={ styles.icon }
                        onClick={ this.props.removeListActivity }
                        className="fas fa-times text-secondary position-absolute"></i>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Col>
    )
  }
}
