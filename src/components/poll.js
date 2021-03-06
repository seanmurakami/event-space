import React from 'react'
import Chart from 'chart.js'
import { Col, Button, Row } from 'reactstrap'

const styles = {
  position: {
    right: '0'
  }
}

export default class Poll extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {}
  }
  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }
  updateCanvas() {
    const ctx = this.ref.current.getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.props.data.map(item => item.item),
        datasets: [{
          label: '# of Votes',
          data: this.props.data.map(item => item.votes),
          backgroundColor: [
            '#17a2b8',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              suggestedMax: 5
            }
          }]
        }
      }
    })
  }
  render() {
    return (
      <Col sm={6}>
        <canvas ref={this.ref} width={100} height={60}>Hello
        </canvas>
        <Row className="d-flex align-items-center justify-content-center">
          <Button color="info" onClick={this.props.toggleVote}>Vote</Button>
          <i onClick={ this.props.removePoll } style={ styles.position } className="fas fa-minus-circle text-secondary position-absolute"></i>
        </Row>
      </Col>
    )
  }
}
