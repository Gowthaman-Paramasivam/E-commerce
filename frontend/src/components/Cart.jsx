import { useEffect } from "react";
import { useState } from "react"
import { Card, Button, Table } from "react-bootstrap"

export const Cart = (props) => {

  const [mainTotal, setMainTotal] = useState(0);

  useEffect(() => {
    const totalSum = Object.entries(props.productQuantity).map(([key, value]) => {
      return props.availableCategory[props.availableCategory.findIndex((data) => data.product_id === Number(key))].price * value
    })
    setMainTotal(totalSum.reduce((a, b) => a + b, 0))
  }, [props])

  return (
    <Card className="margin-top-20px">
      <Card.Header>
        <div className="cart-button card-head">My Cart</div>
      </Card.Header>
      <Card.Body>
        {
          Object.entries(props.productQuantity).length > 0 ?
            <>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(props.productQuantity).map(([key, value], index) => {
                    return (
                      <tr key={key}>
                        <td>{index + 1}</td>
                        <td>{
                          props.availableCategory[props.availableCategory.findIndex((data) => data.product_id === Number(key))].name
                        }
                        </td>
                        <td>{value}</td>
                        <td>
                          {
                            value * props.availableCategory[props.availableCategory.findIndex((data) => data.product_id === Number(key))].price
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <div className="cart-total margin-top-20px ">
                <b>Total Price: {mainTotal}</b>
                <Button>Place Order</Button>
              </div>
            </> :
            <>Card empty</>
        }
      </Card.Body>
    </Card>
  )
}

export default Cart