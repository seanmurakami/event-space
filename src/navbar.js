import React from 'react'
import { Nav, NavItem, NavLink, NavbarBrand, Navbar } from 'reactstrap'

const styles = {
  overlay: {
    background: 'linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
  },
  link: {
    textDecoration: 'none'
  }
}

export default function EventsNavbar(props) {
  return (
    <Navbar style={ styles.overlay } color="faded" className="fixed-top">
      <NavbarBrand style={ styles.link } href="#"><h2 className="text-light font-weight-light">EventSpace</h2></NavbarBrand>
      <Nav>
        <NavItem style={ styles.link }>
          <NavLink href="#create" className="text-light">
            Create Event
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}
