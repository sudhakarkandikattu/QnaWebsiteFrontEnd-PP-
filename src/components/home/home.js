import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      user: "",
    };
    this.userUpdate = this.userUpdate.bind(this);
  }
  userUpdate() {
    this.props.updateUser("");
  }
  async componentDidMount() {
    const url = "http://localhost:3001/";
    const resposnce = await fetch(url);
    const data = await resposnce.json();
    this.setState({
      questions: data,
    });
  }
  render() {
    return (
      <div>
        <NavLink className="Nav_link" to="/askquestion">
          AskQuestion
        </NavLink>
        {
          <div className="rectangle">
            {this.state.questions.map((ques) => (
              <NavLink
                className="Nav_link1 padding-left: 10px;"
                to={{
                  pathname: "/question/" + ques.qid,
                  state: {
                    questiondes: ques.questiondescription,
                    question: ques.question,
                    user: ques.username,
                    qid: ques.qid,
                  },
                }}
              >
                <p>{ques.question}</p>
              </NavLink>
            ))}
          </div>
        }
        <div>
          {this.props.user === "" ? (
            <NavLink className="Nav_link" to="/register">
              SignIn/Register
            </NavLink>
          ) : (
            <p className="Nav_link" onClick={this.userUpdate}>
              Signout{" " + this.props.user}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default home;
