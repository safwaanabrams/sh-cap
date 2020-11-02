import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Google from "./images/google.png";
import Facebook from "./images/facebook.png";

// This page displays the login page

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  // On submission check whether user exists and is authenticated

  submit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res[0] === "authenticated" && res[1] !== "admin@admin.com") {
          window.location.href = "/dashboard";
        } else if (res[0] === "authenticated" && res[1] === "admin@admin.com") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="signup-title">LOGIN</h3>
            <hr />
            <div className="signup">
              <form onSubmit={this.submit}>
                <input
                  type="text"
                  placeholder="username"
                  className="input"
                  required
                  onChange={(e) => this.setState({ username: e.target.value })}
                ></input>
                <input
                  type="email"
                  placeholder="email"
                  className="input"
                  required
                  onChange={(e) => this.setState({ email: e.target.value })}
                ></input>
                <input
                  type="password"
                  placeholder="password"
                  className="input"
                  required
                  onChange={(e) => this.setState({ password: e.target.value })}
                ></input>
                <Button
                  className="signup-button"
                  variant="outline-secondary"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </div>
            <hr className="signup-hr" />
            <div className="social-signup">
              <a href="http://localhost:3001/auth/google">
                <img className="google-logo" src={Google} alt="google" />
              </a>
              <a href="http://localhost:3001/auth/facebook">
                <img className="facebook-logo" src={Facebook} alt="facebook" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
