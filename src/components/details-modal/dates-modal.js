import React from 'react'
import { Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row, Col } from 'reactstrap'
import DatePicker from 'react-datepicker'

export default class DatesModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.editDates} toggle={this.props.toggleEventDates}>
        <ModalHeader toggle={this.props.toggleEventDates}>Edit Event Dates</ModalHeader>
        <Form onSubmit={() => this.props.updateEventDates()}>
          <ModalBody>
            <FormGroup className="text-center">
              <Row>
                <Col>
                  <Label>Start Date</Label>
                  <DatePicker
                    className="text-center"
                    selected={this.props.startDate}
                    onChange={this.props.changeStart}
                  />
                </Col>
                <Col>
                  <Label>End Date</Label>
                  <DatePicker
                    className="text-center"
                    selected={this.props.endDate}
                    onChange={this.props.changeEnd}
                  />
                </Col>
              </Row>
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
