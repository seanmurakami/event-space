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
                <td className="d-flex align-items-center">{ item }</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
