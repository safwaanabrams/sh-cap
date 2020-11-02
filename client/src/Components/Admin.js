import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// This is the admin page
// This page is only accessible if the the user logins with the admin credentials
// Here the admin can delete users from the database

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: "",
    };
  }

  // Onload set all the current users

  componentDidMount = () => {
    fetch("/api/admin", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res[0] === "load page") {
          this.setState({ users: this.state.users.concat(res[1]) });
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.log(error));
  };

  // Lets admin delete user accounts

  deleteUser = (e) => {
    const index = e.target.value;
    this.setState({ id: this.state.users[index]._id });
    this.state.users.splice(index, 1);
    this.setState({ users: this.state.users });
    setTimeout(() => {
      fetch("/api/deleteaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          if (res === "error") {
          } else if (res === "user deleted") {
            alert("User Deleted");
          }
        })
        .catch((error) => console.log(error));
    }, 100);
  };

  // Display all the current users

  display = () => {
    const array = this.state.users;
    return this.state.users.map((e) => (
      <li>
        <div className="user-accounts">
          {e.username} | {e._id}
          <Button
            className="user-delete"
            variant="outline-danger"
            size="sm"
            value={array.indexOf(e)}
            onClick={this.deleteUser}
          >
            Delete User
          </Button>
        </div>
        <hr className="hr-user" />
      </li>
    ));
  };

  render() {
    return (
      <Container className="container-one">
        <Row>
          <Col md={12}>
            <h2 className="dashboard-title">Manage User Accounts</h2>
          </Col>
          <Col md={12}>
            <ul>{this.display()}</ul>
          </Col>
          <Col className="dashboard-bottom" md={12}>
            <a href="/Feed">
              <Button variant="light" size="sm" className="admin-btn">
                Feed
              </Button>
            </a>
            <a href="/login">
              <Button variant="light" size="sm" className="admin-btn">
                Logout
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Admin;
