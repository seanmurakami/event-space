import React from 'react'
import { Table } from 'reactstrap'

const styles = {
  icon: {
    right: '2rem'
  }
}

export default function ConfirmationList(props) {
  return (
    <Table className="border">
      <tbody>
        {
          props.items.map((item, index) => {
            return (
              <tr key={index}>
                <td className="d-flex align-items-center">{ item }<i style={ styles.icon } className="fas fa-times text-secondary position-absolute"></i></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
