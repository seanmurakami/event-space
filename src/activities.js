import React, { Fragment } from 'react'
import { Form, FormGroup, Label, Input, Button, Table, Col } from 'reactstrap'

export default class Activities extends React.Component {
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
    const userData = {}
    userData[userInput] = this.state.activities
    this.props.update(userData)
    this.setState({activities: []})
  }
  render() {
    const { header, label, placeholder } = this.props
    return (
      <Fragment>
        <h3 className="text-center mb-3">{ header }</h3>
        <Form onSubmit={ this.updateActivities } autoComplete="off">
          <FormGroup row>
            <Label md={3}>{ label }</Label>
            <Col md={9}>
              <Input name="activity" placeholder={ placeholder } />
            </Col>
            <Button color="primary" className="my-3 mx-auto w-50">add</Button>
          </FormGroup>
          <Fragment>
            { this.state.activities.length !== 0 &&
            <Table className="border w-75 mx-auto">
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
        <div className="d-flex justify-content-between">
          <Button href="#create?step=lodging" color="primary">Previous</Button>
          <Button onClick={ this.updateApp } name="continue" color="primary">Continue</Button>
        </div>
      </Fragment>
    )
  }
}
