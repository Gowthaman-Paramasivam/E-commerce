import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import decode from "jwt-decode";
import { getProduct } from "../api"

export const CustomNavbar = (props) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

  const [searchProduct, setSearchProduct] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const signOut = () => {
    localStorage.clear();
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.data.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) signOut();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Navbar bg="light" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand href="#">Welcome to E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={props.searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value)
              }}
            />
            <Button
              variant="outline-success"
              onClick={() => {
                console.log(searchProduct);
                getProduct({ name: searchProduct })
                  .then((data) => {
                    console.log(data);
                    props.setCategoryList(data.data.result)
                  })
              }}
            >Search</Button>
          </Form>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown
              title={user.data.result.firstName + user.data.result.lastName}
              id="navbarScrollingDropdown" style={{ "marginRight": "0px" }}>
              <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default CustomNavbar;