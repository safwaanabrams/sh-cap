import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

// This is the page for the user's dashboard
// This page also lets users post messages to the Feed page
// This page shows the user their messages, favourited messages and other users they are following
// It also lets them edit and delete messages and follows

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      input: "",
      editLock: "",
      visible: false,
      username: "",
      favourites: [],
      follow: [],
    };
  }

  // Onload set the users messages, favourited messages, following users, username

  componentDidMount = () => {
    fetch("/api/dashboard", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res[0] === "load page") {
          this.setState({
            message: this.state.message.concat(res[1]),
            username: res[2],
            favourites: this.state.favourites.concat(res[3]),
            follow: this.state.follow.concat(res[4]),
          });
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.log(error));
  };

  // Display the users the user is following

  follow = () => {
    const array = this.state.follow;
    return this.state.follow.map((e) => (
      <li>
        <div className="follow-div">
          <Button
            variant="primary"
            size="sm"
            value={e._id}
            onClick={this.userMessages}
          >
            {e.username}
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="login-button-home"
            value={array.indexOf(e)}
            onClick={this.deleteFollow}
          >
            Delete
          </Button>
        </div>
      </li>
    ));
  };

  // When user clicks on a user they are following
  // That user's id is saved to the session
  // The user is then redirected to a page displaying the user's entire message history

  userMessages = (e) => {
    const id = e.target.value;
    sessionStorage.setItem("id", id);
    window.location.href = "/user";
  };

  // Let user submit messages to their profile to be displayed on the Feed page

  submit = (e) => {
    e.preventDefault();
    const date = new Date();
    this.setState({
      message: this.state.message.concat({
        message: this.state.input,
        date: date.toDateString(),
      }),
    });
    setTimeout(() => {
      fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: this.state.message,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          if (res === "error") {
          } else if (res === "message saved") {
            alert("Message Submitted");
          }
        })
        .catch((error) => console.log(error));
    }, 100);
  };

  // When user clicks edit message button
  // Display message editing functionality

  viewEdit = () => {
    if (this.state.visible === false) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  };

  // Display the user's own messages with or without editing functionality
  // Depending on whether they have set visible to false or true

  display = () => {
    const array = this.state.message;
    if (this.state.visible === false) {
      return this.state.message.map((e) => (
        <div>
          <li>
            <Card>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>"{e.message}"</p>
                  <footer className="blockquote-footer">{e.date}</footer>
                </blockquote>
              </Card.Body>
            </Card>

            <Button
              variant="outline-danger"
              size="sm"
              className="delete-btn"
              value={array.indexOf(e)}
              onClick={this.deletePersonal}
            >
              Delete
            </Button>
          </li>
        </div>
      ));
    } else {
      return this.state.message.map((e) => (
        <div>
          <li>
            <Card>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>"{e.message}"</p>
                  <footer className="blockquote-footer">{e.date}</footer>
                </blockquote>
              </Card.Body>
            </Card>
            <Button
              variant="outline-danger"
              size="sm"
              className="delete-btn-edit"
              value={array.indexOf(e)}
              onClick={this.deletePersonal}
            >
              Delete
            </Button>
            <div>
              <input
                className="edit-input"
                onChange={(e) => this.setState({ editLock: e.target.value })}
              />
              <Button
                variant="light"
                size="sm"
                className="save-float"
                value={array.indexOf(e)}
                onClick={this.edit}
              >
                Save Changes
              </Button>
            </div>
            <hr className="edit-divide" />
          </li>
        </div>
      ));
    }
  };

  // Lets users save their edits and update their profile

  edit = (e) => {
    const array = this.state.message;
    const index = e.target.value;
    array[index].message = this.state.editLock;
    this.setState({ message: array });
    fetch("/api/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: this.state.message,
      }),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "error") {
        } else if (res === "message edited") {
          alert("Message Edited");
        }
      })
      .catch((error) => console.log(error));
  };

  // Lets users delete their own messages

  deletePersonal = (e) => {
    const index = e.target.value;
    this.state.message.splice(index, 1);
    this.setState({ message: this.state.message });
    fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: this.state.message,
      }),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "error") {
        } else if (res === "message deleted") {
          alert("Message Deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  // Lets users delete their favourited messages

  deleteFave = (e) => {
    const index = e.target.value;
    this.state.favourites.splice(index, 1);
    this.setState({ favourites: this.state.favourites });
    fetch("/api/deletefave", {
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
        } else if (res === "favourite deleted") {
          alert("Favourite Deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  // Lets users delete the users they are following

  deleteFollow = (e) => {
    const index = e.target.value;
    this.state.follow.splice(index, 1);
    this.setState({ follow: this.state.follow });
    fetch("/api/deletefollow", {
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
        } else if (res === "follow deleted") {
          alert("Follow Deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  // Displays the users favourited messages

  favourites = () => {
    const array = this.state.favourites;
    return this.state.favourites.map((e) => (
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
          variant="outline-danger"
          size="sm"
          className="delete-btn"
          value={array.indexOf(e)}
          onClick={this.deleteFave}
        >
          Delete
        </Button>
      </li>
    ));
  };

  render() {
    return (
      <Container className="container-one">
        <Row>
          <Col md={12}>
            <h2 className="dashboard-title">Hey, {this.state.username}!</h2>
          </Col>
          <Col md={5}>
            <Form onSubmit={this.submit}>
              <InputGroup>
                <FormControl
                  placeholder="What's on your mind?"
                  onChange={(e) => this.setState({ input: e.target.value })}
                />
                <Button type="submit" className="button-margin" variant="light">
                  Share!
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={7}>
            <h4>Your Messages</h4>
            <Button variant="light" size="sm" onClick={this.viewEdit}>
              Edit Messages
            </Button>
            <hr className="edit-divide" />
            <ul>{this.display()}</ul>
            <h4>Favourited Messages</h4>
            <hr className="edit-divide" />
            <ul>{this.favourites()}</ul>
            <h4>Following</h4>
            <hr className="edit-divide" />
            <ul>{this.follow()}</ul>
          </Col>
          <Col md={12} className="dashboard-bottom">
            <a href="/feed">
              <Button size="sm" variant="success">
                Go To Feed
              </Button>
            </a>
            <a href="/">
              <Button className="button-margin" size="sm" variant="light">
                Logout
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
