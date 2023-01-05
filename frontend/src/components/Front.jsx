import { Row, Col, Card, Button } from "react-bootstrap"
import { useState } from "react";
import Cart from "./Cart";
import { BiRupee } from "react-icons/bi";
import { useEffect } from "react";

export const Front = (props) => {
  const [availableCategory, setAvailableCategory] = useState(props.data);

  const [productQuantity, setProductQuantity] = useState({});

  function incrementData(id) {
    if (productQuantity.hasOwnProperty(id)) {
      productQuantity[id] = productQuantity[id] + 1
      setProductQuantity({ ...productQuantity })
    } else {
      productQuantity[id] = 1
      setProductQuantity({ ...productQuantity })
    }
  }

  function decrementData(id) {
    if (productQuantity[id] > 1) {
      productQuantity[id] = productQuantity[id] - 1
      setProductQuantity({ ...productQuantity })
    } else {
      delete productQuantity[id];
      setProductQuantity({ ...productQuantity })
    }
  }

  useEffect(() => {
    setAvailableCategory(props.data)
  })

  return (
    <>
    <Row className="example2">
      <Col md={8}>
        {
            <Row xs={1} md={4} className="g-1" style={{ "padding": "10px" }}>
              {
                availableCategory.map((value) => {
                  return (
                    <Col key={JSON.stringify(value)}>
                      <Card>
                        <Card.Header>{value.name}</Card.Header>
                        <Card.Body>
                          <Row>
                            <Col><BiRupee />{value.price}</Col>
                          </Row>
                          <Row className="margin-top-20px">
                            <Col><Button
                              size="sm"
                              onClick={() => {
                                decrementData(value.product_id)
                              }}
                            >-</Button>
                            </Col>
                            <Col>
                              {
                                productQuantity.hasOwnProperty(value.product_id) ?
                                  productQuantity[value.product_id] :
                                  0
                              }
                            </Col>
                            <Col>
                              <Button size="sm"
                                onClick={() => {
                                  incrementData(value.product_id)
                                }}
                              >+</Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
        }
      </Col>
      <Col md={4} style={{ "padding": "0px 40px 20px 20px" }}>
        {
          Object.entries(productQuantity).length > 0 ?
            <Cart availableCategory={availableCategory} productQuantity={productQuantity} /> : <></>
        }
      </Col>
    </Row>
    </>
  )
}