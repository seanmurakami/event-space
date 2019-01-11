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
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  starRating(rating) {
    const result = []
    for (let i = 1; i <= rating; i++) {
      result.push(<i className="fas fa-star text-info" key={i}></i>)
    }
    if (Math.ceil(rating) !== rating) {
      result.push(<i className="fas fa-star-half-alt text-info" key={rating}></i>)
    }
    return result
  }
  componentDidMount() {
    fetch(`/restaurants?location=${this.props.selectedEvent.eventLocation}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({restaurants: data.businesses, loading: false})
      })
  }
  render() {
    const { selectedEvent } = this.props
    if (!this.state.loading) {
      return (
        <Card className="mb-3 container p-0 shadow" style={ styles.width }>
          <CardHeader tag='h3' className="text-center font-weight-light">{`What to do in ${selectedEvent.eventLocation}`}</CardHeader>
          <CardBody className="pb-0">
            {this.state.restaurants.map((item, index) => {
              const { name, url, price, location, rating } = item
              const updatePrice = price !== undefined ? `(${price})` : ''
              return (
                <Card key={index} className="mb-3 p-2 text-secondary">
                  <Row>
                    <Col sm={3}>
                      <img src={item.image_url} style={ styles.image }/>
                    </Col>
                    <Col className="align-self-center">
                      <Row>
                        <Col><CardText tag='h5' className="text-dark">{`${index + 1}.  ${name}  ${updatePrice}`}</CardText></Col>
                        <Col sm="auto" className="mr-2"><CardText>{location.address1}</CardText></Col>
                      </Row>
                      <CardText className="mb-0">{this.starRating(rating)}</CardText>
                      <CardText className="mb-0">{this.numberWithCommas(item.review_count)} Reviews</CardText>
                      <CardText>{item.display_phone}</CardText>
                      <CardLink href={ url } target="_blank">Link</CardLink>
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
