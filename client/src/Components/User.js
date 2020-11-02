import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// This page displays what the user sees when the click on a user they are following
// Is shows the users entire message history

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      id: "",
      username: "",
    };
  }

  // Onload retieve id saved in session
  // Search for id in database and send back user messages

  componentDidMount = () => {
    const id = sessionStorage.getItem("id");
    setTimeout(() => {
      this.setState({ id: id });
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res[0] === "load page") {
            this.setState({
              message: this.state.message.concat(res[1]),
              username: res[2],
            });
          } else {
            window.location.href = "/login";
          }
        })
        .catch((error) => console.log(error));
    }, 100);
  };

  // Display user messages

  display = () => {
    const array = this.state.message;
    return array.map((e) => (
      <li>
        <Card className="user-card">
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>"{e.message}"</p>
              <footer className="blockquote-footer">{e.date}</footer>
            </blockquote>
          </Card.Body>
        </Card>
      </li>
    ));
  };

  render() {
    return (
      <Container className="container-one">
        <Row>
          <Col md={12}>
            <h2 className="dashboard-title">{this.state.username}</h2>
          </Col>
          <Col md={12}>
            <ul>{this.display()}</ul>
          </Col>
          <Col className="dashboard-bottom" md={12}>
            <a href="/dashboard">
              <Button variant="success" size="sm" className="left-btn">
                Dashboard
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default User;
