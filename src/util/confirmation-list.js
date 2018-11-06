import React from 'react'
import { Table } from 'reactstrap'

export default function ConfirmationList(props) {
  return (
    <Table className="border">
      <tbody>
        {
          props.items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{ item.value }</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
