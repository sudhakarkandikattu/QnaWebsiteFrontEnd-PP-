import React, { Component } from "react";
import { NavLink } from "react-router-dom";
var history = require('browser-history')

class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
      password: "",
      userexist: true,
    };
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  onSign = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) this.setState({ userexist: false });
        else {
          this.props.updateUser(data[0].username);
          history(-2);
        }
      });
  };
  render() {
    return (
      <div className="rectangle">
        {!this.state.userexist ? (
          <div className="error">wrong username or password ,Try Again</div>
        ) : (
          <div></div>
        )}
        <div className="container">
          <h3 className="Ask">Signin </h3>
          <input
            onChange={this.onEmailChange}
            placeholder="email"
            type="email"
          />
          <br />
          <input
            onChange={this.onPasswordChange}
            placeholder="password"
            type="password"
          />
          <br />
          <input onClick={this.onSign} type="submit" value="Login" />
          <NavLink className="link" to="/register">
            <p className="text">Register</p>{" "}
          </NavLink>
        </div>
      </div>
    );
  }
}

export default signin;
