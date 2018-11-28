import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, CardText, Input, Table } from 'reactstrap'

const styles = {
  icon: {
    right: '2rem'
  }
}

export default class FoodList extends React.Component {
  render() {
    return (
      <Col sm={6}>
        <CardText tag="h4"><i className="fas fa-utensils mr-2 mb-2"></i>Food<i onClick={ this.props.toggleFood } className="far fa-plus-square fa-xs text-secondary ml-2"></i></CardText>
        <Modal isOpen={ this.props.foodModal } toggle={ this.props.toggleFood } className="modal-dialog modal-dialog-centered">
          <ModalHeader toggle={ this.props.toggleFood }>Add a New Place To Eat/Dine</ModalHeader>
          <Form autoComplete="off" onSubmit={ this.props.addFood }>
            <ModalBody>
              <FormGroup>
                <Label>Food/Restaurant</Label>
                <Input name="food" placeholder="e.g. Shake Shack" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="info">Add</Button>{' '}
              <Button color="secondary" onClick={ this.props.toggleFood }>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Table className="border">
          <tbody>
            {
              this.props.food.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="d-flex align-items-center justify-content-center">
                      { item.value }
                      <i
                        id={ item.lookup }
                        style={ styles.icon }
                        onClick={ this.props.removeListFood }
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
