import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// This page displays the Home page

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="brand-title">THNK TNK</h3>
            <hr />
            <div className="loginsignup">
              <a href="/signup">
                <Button variant="outline-secondary">Signup</Button>
              </a>
              <a href="/login">
                <Button
                  variant="outline-secondary"
                  className="login-button-home"
                >
                  Login
                </Button>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
