import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Answer from "./answer";
import "./answer.css";
class answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      answer:""
    };
    this.userUpdate = this.userUpdate.bind(this);
    this.getAnswers=this.getAnswers.bind(this);
  }
  userUpdate() {
    this.props.updateUser("");
  }
  componentDidMount(){
    this.getAnswers();
  }
  getAnswers=()=>{
    const id = this.props.location.state.qid;
    fetch("http://localhost:3001/answers/"+id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          answers:data
        })
      });
  };
  onPost = () => {
    fetch("http://localhost:3001/Apost", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: this.state.answer,
        qid: this.props.location.state.qid,
        user: this.props.user,
      }),
    }).then((res) => {
      this.getAnswers();
    });
  };
  onDetailsChange = (event) => {
    this.setState({ answer: event.target.value });
  };
  render() {
    return (
      <div>
          <NavLink className="Nav_link" to="/">Home</NavLink>
        <div className="rectangle">
          <div>
            <p className="questionans">{this.props.location.state.question}</p>
            <p className="questiondes">{this.props.location.state.questiondes}</p>
            <p className="user">posted by {this.props.location.state.user}</p>
          </div>
          {
            this.state.answers.map((ans) => (
              <Answer answer={ans.answer} user={ans.username} qid={ans.qid} />
            ))
          }
          <div>
          {
          this.props.user === "" ? <div></div> 
          : <div className="container">
              <h3 className="Ask">Answer</h3>
              <textarea
                onChange={this.onDetailsChange}
                placeholder="answer"
                type="text"
              />
              <br />
              <input onClick={this.onPost} type="submit" value="Submit" />
            </div>
          }
        </div>
        </div>
        <div>
          {
          this.props.user === "" 
          ? <NavLink className="Nav_link" to="/register">SignIn/Register</NavLink> 
          : <p className="Nav_link" onClick={this.userUpdate}>Signout{" "+ this.props.user}</p>
          }
        </div>
      </div>
    );
  }
}

export default answers;
