import React from 'react'
import { Table } from 'reactstrap'

export default function UpdateTable(props) {
  const items = props.lodging.map((lodge, index) => {
    return (
      <tr key={index}>
        <th scope="row">{ index + 1 }</th>
        <td>{ lodge.locationType }</td>
        <td>{ lodge.locationAddress }</td>
        <td>${ lodge.locationCost }</td>
      </tr>
    )
  })
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Address</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        { items }
      </tbody>
    </Table>
  )
}
