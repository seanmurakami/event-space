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

const sample = {
  businesses: [
    {
      name: 'Starbucks',
      image: 'https://s3-media2.fl.yelpcdn.com/bphoto/ztgBy47sZt0Q3nZRzUOvvw/o.jpg',
      url: 'https://www.yelp.com/biz/starbucks-oakhurst?adjust_creative=h6DDCY108zjS_mkHXAFZIw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=h6DDCY108zjS_mkHXAFZIw',
      price: '$',
      phone: '(559) 658-8101',
      reviewCount: 29
    },
    {
      name: 'Starbucks',
      image: 'https://s3-media2.fl.yelpcdn.com/bphoto/ztgBy47sZt0Q3nZRzUOvvw/o.jpg',
      url: 'https://www.yelp.com/biz/starbucks-oakhurst?adjust_creative=h6DDCY108zjS_mkHXAFZIw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=h6DDCY108zjS_mkHXAFZIw',
      price: '$',
      phone: '(559) 658-8101',
      reviewCount: 29
    },
    {
      name: 'Starbucks',
      image: 'https://s3-media2.fl.yelpcdn.com/bphoto/ztgBy47sZt0Q3nZRzUOvvw/o.jpg',
      url: 'https://www.yelp.com/biz/starbucks-oakhurst?adjust_creative=h6DDCY108zjS_mkHXAFZIw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=h6DDCY108zjS_mkHXAFZIw',
      price: '$',
      phone: '(559) 658-8101',
      reviewCount: 29
    }
  ]
}

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    }
  }
  componentDidMount() {
    fetch(`/restaurants?location=${this.props.selectedEvent.eventLocation}`)
      .then(res => res.json())
      .then(data => console.log(data))
  }
  render() {
    return (
      <Card className="mb-3 mx-auto" style={ styles.width }>
        <CardHeader tag='h3' className="text-center">Restaurants in the area:</CardHeader>
        <CardBody className="pb-0">
          {sample.businesses.map((item, index) => {
            return (
              <Card key={index} className="mb-3 p-2">
                <Row>
                  <Col sm={3}>
                    <img src={item.image} style={ styles.image }/>
                  </Col>
                  <Col className="align-self-center">
                    <CardText tag='h4'>{item.name}</CardText>
                    <CardText>Reviews: {item.reviewCount}</CardText>
                    <CardText>Number: {item.phone}</CardText>
                    <CardLink href={ item.url }>Link</CardLink>
                  </Col>
                </Row>
              </Card>
            )
          })}
        </CardBody>
      </Card>
    )
  }
}
