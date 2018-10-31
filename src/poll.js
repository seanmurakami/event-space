import React from 'react'
import Chart from 'chart.js'
import { Col } from 'reactstrap'

export default class Poll extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {}
  }
  componentDidMount() {
    this.updateCanvas()
  }
  updateCanvas() {
    const ctx = this.ref.current.getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
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
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
  render() {
    return (
      <Col sm={6}>
        <canvas ref={this.ref} width={100} height={100}>Hello
        </canvas>
      </Col>
    )
  }
}
