import React from 'react'
import { Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem, Card, CardHeader, CardBody, CardText, CardLink, Col, Row } from 'reactstrap'

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
      restaurants: [],
      loading: true,
      dropdown: false,
      filteredGroup: [],
      filter: false
    }
    this.toggle = this.toggle.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.updateRating = this.updateRating.bind(this)
    this.filterSelection = this.filterSelection.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  starRating(rating) {
    const result = []
    for (let i = 1; i <= rating; i++) {
      result.push(<i className="fas fa-star text-warning" key={i}></i>)
    }
    if (Math.ceil(rating) !== rating) {
      result.push(<i className="fas fa-star-half-alt text-warning" key={rating}></i>)
    }
    return result
  }
  toggle() {
    this.setState({dropdown: !this.state.dropdown})
  }
  compareReviews(a, b) {
    return a.review_count - b.review_count
  }
  compareCost(a, b) {
    return a.rating - b.rating
  }
  updateFilter(myItems) {
    const restaurants = myItems
      .map(num => num)
      .sort(this.compareReviews)
      .reverse()
    this.setState({restaurants})
  }
  updateRating(myItems = {}) {
    const restaurants = myItems
      .map(num => num)
      .sort(this.compareCost)
      .reverse()
    this.setState({restaurants})
  }
  filterSelection(e) {
    const category = e.target.innerHTML
    const restaurantCopy = [...this.state.restaurants]
    const filteredGroup = restaurantCopy.filter(item => item.price === category)
    this.setState({filteredGroup, filter: true})
  }
  clearFilter() {
    this.setState({filter: false})
  }
  componentDidMount() {
    fetch(`/restaurants?location=${this.props.selectedEvent.eventLocation}`)
      .then(res => res.json())
      .then(data => {
        this.setState({restaurants: data.businesses, loading: false})
      })
  }
  render() {
    const { selectedEvent } = this.props
    const filter = this.state.filter ? this.state.filteredGroup : this.state.restaurants
    if (!this.state.loading) {
      return (
        <Card className="mb-3 container p-0 shadow" style={ styles.width }>
          <CardHeader tag='h3' className="text-center font-weight-light mb-2">{`What to do in ${selectedEvent.eventLocation}`}</CardHeader>
          <CardBody className="py-0 font-weight-light">
            <Row className="d-flex justify-content-between mx-1 mb-2">
              <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggle}>
                <DropdownToggle caret className="text-info" color="none">
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Sort By</DropdownItem>
                  <DropdownItem onClick={() => this.updateFilter(this.state.restaurants)}>Number of Reviews</DropdownItem>
                  <DropdownItem onClick={() => this.updateRating(this.state.restaurants)}>Rating</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonGroup className="border rounded">
                <Button color="none" className="text-info" onClick={ this.filterSelection }>$</Button>
                <Button color="none" className="text-info" onClick={ this.filterSelection }>$$</Button>
                <Button color="none" className="text-info" onClick={ this.filterSelection }>$$$</Button>
                <Button color="none" className="text-info" onClick={ this.filterSelection }>$$$$</Button>
                <Button color="none" className="text-info" onClick={ this.clearFilter }>x</Button>
              </ButtonGroup>
            </Row>
            {filter.map((item, index) => {
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
