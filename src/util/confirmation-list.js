import React from 'react'
import { Table } from 'reactstrap'

export default function ConfirmationList(props) {
  return (
    <Table className="border">
      <tbody>
        {
          props.items.length !== 0 &&
          props.items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{ item }</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
