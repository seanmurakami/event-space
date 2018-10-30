import React from 'react'
import { Nav } from 'reactstrap'

const styles = {
  overlay: {
    background: 'linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
  }
}

export default function Navbar(props) {
  return (
    <Nav style={ styles.overlay } color="faded" className="fixed-top">
      <h2 className="ml-3 mt-3 text-light font-weight-light">EventSpace</h2>
    </Nav>
  )
}
