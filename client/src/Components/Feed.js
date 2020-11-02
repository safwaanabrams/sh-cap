import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// This page displays all the site user's most recent message submissions

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      favourites: [],
      follow: [],
    };
  }

  // Onload fetch all the site user's messages

  componentDidMount = () => {
    fetch("/api/usermessages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res[0] === "load page") {
          this.setState({ messages: this.state.messages.concat(res[1]) });
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.log(error));
  };

  // Lets users add a specific message to their favourited messages

  add = (e) => {
    const array = this.state.messages;
    this.setState({
      favourites: this.state.favourites.concat(array[e.target.value]),
    });
    setTimeout(() => {
      console.log(this.state.favourites);
      fetch("/api/favourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favourites: this.state.favourites,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          if (res === "error") {
          } else if (res === "added to favourites") {
            alert("Favourited!");
          }
        })
        .catch((error) => console.log(error));
    }, 100);
  };

  // Lets users add a user to the users they are following

  follow = (e) => {
    const array = this.state.messages;
    this.setState({ follow: this.state.follow.concat(array[e.target.value]) });
    setTimeout(() => {
      fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          follow: this.state.follow,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          if (res === "error") {
          } else if (res === "following") {
            alert("Following!");
          }
        })
        .catch((error) => console.log(error));
    }, 100);
  };

  // Displays all the site user's most recent message submissions

  display = () => {
    const array = this.state.messages;
    return this.state.messages.map((e) => (
      <li>
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>"{e.message.slice(-1)[0].message}"</p>
              <footer className="blockquote-footer">
                {e.username} | {e.message.slice(-1)[0].date}
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <Button
          variant="light"
          size="sm"
          className="delete-btn"
          value={array.indexOf(e)}
          onClick={this.add}
        >
          Add to Favourites
        </Button>
        <Button
          variant="light"
          size="sm"
          className="delete-btn feed-button"
          value={array.indexOf(e)}
          onClick={this.follow}
        >
          Follow To See More!
        </Button>
      </li>
    ));
  };

  render() {
    return (
      <Container className="container-one">
        <Row>
          <Col md={12}>
            <h2 className="dashboard-title">Feed</h2>
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
            <a href="/">
              <Button variant="light" size="sm" className="button-margin">
                Logout
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Feed;
