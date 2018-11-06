import React, { Fragment } from 'react'
import ButtonGroup from '../util/button-group'
import { Form, FormGroup, Label, Input, Button, Table, Col } from 'reactstrap'

export default class CreateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: []
    }
    this.updateActivities = this.updateActivities.bind(this)
    this.updateApp = this.updateApp.bind(this)
  }
  updateActivities(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const activity = formData.get('activity')
    const activities = [...this.state.activities, activity]
    this.setState({ activities })
    e.target.reset()
  }
  updateApp() {
    const userInput = this.props.name
    const nextScreen = this.props.name === 'activities' ? 'food' : 'confirmation'
    const userData = {}
    userData[userInput] = this.state.activities
    this.props.update(userData, nextScreen)
    this.setState({activities: []})
  }
  render() {
    const { header, label, placeholder } = this.props
    return (
      <Fragment>
        <h3 className="font-weight-light text-center mb-3">{ header }</h3>
        <Form onSubmit={ this.updateActivities } autoComplete="off">
          <FormGroup row>
            <Label md={3}>{ label }</Label>
            <Col md={9}>
              <div className="input-group">
                <Input name="activity" placeholder={ placeholder } />
                <div className="input-group-append">
                  <Button color="link">+</Button>
                </div>
              </div>
            </Col>
          </FormGroup>
          <Fragment>
            { this.state.activities.length !== 0 &&
            <Table className="border mx-auto">
              <thead>
                <tr>
                  <th>{ label }</th>
                </tr>
              </thead>
              <tbody>
                { this.state.activities.map((activity, index) => {
                  return (
                    <tr key={index}>
                      <td>{ activity }</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            }
          </Fragment>
        </Form>
        <ButtonGroup params={`create?step=${this.props.location}`} updateUserInfo={ this.updateApp } />
      </Fragment>
    )
  }
}
