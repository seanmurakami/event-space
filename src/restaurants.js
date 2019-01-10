import React from 'react'
import { Card, CardHeader, CardBody, CardText, CardLink, Col, Row } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '50rem'
  },
  image: {
    height: '150px',
    width: '150px',
    borderRadius: '4px'
  }
}

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: null,
      loading: true
    }
  }
  componentDidMount() {
    fetch(`/restaurants?location=${this.props.selectedEvent.eventLocation}`)
      .then(res => res.json())
      .then(data => this.setState({restaurants: data.businesses, loading: false}))
  }
  render() {
    if (!this.state.loading) {
      return (
        <Card className="mb-3 mx-auto" style={ styles.width }>
          <CardHeader tag='h3' className="text-center">Restaurants in the area:</CardHeader>
          <CardBody className="pb-0">
            {this.state.restaurants.map((item, index) => {
              const { name, url } = item
              return (
                <Card key={index} className="mb-3 p-2">
                  <Row>
                    <Col sm={3}>
                      <img src={item.image_url} style={ styles.image }/>
                    </Col>
                    <Col className="align-self-center">
                      <CardText tag='h4'>{name}</CardText>
                      <CardText>Reviews: {item.review_count}</CardText>
                      <CardText>Number: {item.display_phone}</CardText>
                      <CardLink href={ url }>Link</CardLink>
                    </Col>
                  </Row>
                </Card>
              )
            })}
          </CardBody>
        </Card>
      )
    }
    return (
      <div>
        <h1 className='text-center'>loading...</h1>
      </div>
    )
  }
}
