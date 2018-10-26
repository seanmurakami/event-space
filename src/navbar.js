import React from 'react'
import { Nav } from 'reactstrap'

export default function Navbar(props) {
  return (
    <Nav className="fixed-top navbar-dark bg-primary">
      <h2 className="ml-3 mt-3 text-light font-weight-light">EventSpace</h2>
    </Nav>
  )
}
