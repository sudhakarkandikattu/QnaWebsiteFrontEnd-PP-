import React, { Component } from "react";
import "./AskQuestionComp.css";
import { NavLink } from "react-router-dom";
var history = require("browser-history");
class AskQuestionComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      details: "",
    };
  }
  onQuestionChange = (event) => {
    this.setState({ question: event.target.value });
  };

  onDetailsChange = (event) => {
    this.setState({ details: event.target.value });
  };
  onPost = () => {
    fetch("http://localhost:3001/Qpost", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: this.state.question,
        details: this.state.details,
        user: this.props.user,
      }),
    }).then((res) => {
      history(-1);
    });
  };
  render() {
    return (
      <div>
        <NavLink className="Nav_link" to="/">Home</NavLink>
        <div className="rectangle">
          {this.props.user === "" ? (
            <div className="Ask">
              You need to login first <NavLink to="/signin"> Login</NavLink>
            </div>
          ) : (
            <div className="container">
              <h3 className="Ask">Question</h3>
              <input
                onChange={this.onQuestionChange}
                placeholder="enter question"
                type="text"
              />
              <h3 className="Ask">Details</h3>
              <textarea
                onChange={this.onDetailsChange}
                placeholder="question details"
                type="text"
              />
              <br />
              <input onClick={this.onPost} type="submit" value="post" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AskQuestionComp;
