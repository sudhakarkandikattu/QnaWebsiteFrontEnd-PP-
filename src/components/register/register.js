import React, { Component } from "react";
import "./register.css";
import { Link } from "react-router-dom";
class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
      password: "",
      userexist: false,
    };
  }

  onNameChange = (event) => {
    this.setState({ user: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  onNotExist = () => {
    fetch("http://localhost:3001/userexist/" + this.state.user)
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data).length === 0) this.onPost();
        else this.setState({ userexist: true });
      });
  };
  onPost = () => {
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: this.state.user,
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((res) => {
      this.props.updateUser(this.state.user);
      this.setState({ onpost: true });
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div className="rectangle">
        {this.state.userexist ? (
          <div className="error">username exist,try another</div>
        ) : (
          <div></div>
        )}
        <div className="container">
          <h3 className="Ask">Register </h3>
          <input
            onChange={this.onNameChange}
            placeholder="username"
            type="text"
          />
          <br />
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
          <input onClick={this.onNotExist} type="submit" value="Register" />
          <Link className="link" to="/signin">
            <p className="text">Sign in</p>{" "}
          </Link>
        </div>
      </div>
    );
  }
}

export default register;
