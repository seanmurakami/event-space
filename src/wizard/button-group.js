import React, { Fragment } from 'react'
import { Button } from 'reactstrap'

export default function ButtonGroup(props) {
  return (
    <Fragment>
      <div className="d-none d-sm-flex justify-content-between">
        <Button href={`#${props.params}`} outline color="primary">Previous</Button>
        <Button onClick={ props.updateUserInfo } color="primary">Continue</Button>
      </div>
      <div className="d-flex d-sm-none justify-content-between align-items-center">
        <Button color="link" href={`#${props.params}`}>
          <i className="fa fa-arrow-alt-circle-left fa-2x text-secondary"/>
        </Button>
        <Button color="link" onClick={ props.updateUserInfo }>
          <i className="fa fa-arrow-alt-circle-right fa-2x text-primary"/>
        </Button>
      </div>
    </Fragment>
  )
}
