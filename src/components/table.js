import React, { Fragment } from 'react'
import { Table } from 'reactstrap'

export default function UpdateTable(props) {
  const items = props.lodging.map((lodge, index) => {
    return (
      <tr key={index}>
        <td>{ lodge.locationType }</td>
        <td>{ lodge.locationAddress }</td>
        <td>${ lodge.locationCost }</td>
      </tr>
    )
  })
  return (
    <Fragment>
      { props.lodging.length !== 0 &&
    <Table className="mt-2 border text-center">
      <thead>
        <tr>
          <th>Type</th>
          <th>Address</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        { items }
      </tbody>
    </Table>
      }
    </Fragment>
  )
}
