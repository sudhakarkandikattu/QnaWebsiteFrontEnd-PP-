import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AskQuestionComp from "./components/AskQuestionComp/AskQuestionComp";
import Signin from "./components/signin/signin";
import Register from "./components/register/register";
import Home from "./components/home/home";
import Answer from "./components/answers/answers";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
    };
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser(data) {
    this.setState({
      user: data,
    });
    console.log(this.state.user);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    updateUser={this.updateUser}
                    user={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path="/question/:id"
                render={(props) => (
                  <Answer
                    {...props}
                    updateUser={this.updateUser}
                    user={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path="/askquestion"
                render={(props) => (
                  <AskQuestionComp {...props} user={this.state.user} />
                )}
              />
              <Route
                exact
                path="/register"
                render={(props) => (
                  <Register
                    {...props}
                    updateUser={this.updateUser}
                    user={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path="/signin"
                render={(props) => (
                  <Signin
                    {...props}
                    updateUser={this.updateUser}
                    user={this.state.user}
                  />
                )}
              />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
