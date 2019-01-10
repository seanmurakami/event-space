import React from 'react'
import { Nav, NavItem, NavLink, NavbarBrand, Navbar } from 'reactstrap'

const styles = {
  link: {
    textDecoration: 'none'
  }
}

export default function EventsNavbar(props) {
  return (
    <Navbar color="info" className="fixed-top">
      <NavbarBrand style={ styles.link } href="#"><h2 className="text-light font-weight-light"><i className="far fa-map mr-2"></i>EventSpace</h2></NavbarBrand>
      <Nav>
        <NavItem style={ styles.link }>
          <NavLink onClick={ props.update } href="#create" className="d-none d-sm-inline-block text-light">
            Create Event
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}
