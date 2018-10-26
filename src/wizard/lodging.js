import React, { Fragment } from 'react'
import UpdateTable from '../util/table'
import ButtonGroup from '../util/button-group'
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, Col } from 'reactstrap'

export default class Lodging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lodges: []
    }
    this.addLodge = this.addLodge.bind(this)
    this.updateApp = this.updateApp.bind(this)
  }
  addLodge(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userInfo = {
      locationType: formData.get('event-type'),
      locationAddress: formData.get('event-address'),
      locationCost: formData.get('event-cost')
    }
    const lodges = [...this.state.lodges, userInfo]
    this.setState({ lodges })
    e.target.reset()
  }
  updateApp() {
    this.props.update(this.state, 'activities')
  }
  render() {
    return (
      <Fragment>
        <h3 className="text-center mb-3">Select a Place to Stay!</h3>
        <Form onSubmit={ this.addLodge } autoComplete="off">
          <FormGroup row>
            <Label md={3}>Location/Type:</Label>
            <Col md={9}>
              <Input name="event-type" placeholder="e.g. AirBnb, Hotel, etc." />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={3}>Address:</Label>
            <Col md={9}>
              <Input name="event-address" placeholder="e.g. 123 Address St" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={3}>Cost:</Label>
            <Col md={9} className="mb-3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input name="event-cost" placeholder="e.g. $489" />
              </InputGroup>
            </Col>
            <Button color="primary" className="mx-auto w-50">add</Button>
            <UpdateTable className="mx-auto" lodging={ this.state.lodges }/>
          </FormGroup>
        </Form>
        <ButtonGroup params="create?step=date" updateUserInfo={ this.updateApp }/>
      </Fragment>
    )
  }
}