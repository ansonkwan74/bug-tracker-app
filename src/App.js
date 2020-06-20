import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/issues-log.component";
import EditIssue from "./components/edit-issue.component";
import CreateIssue from "./components/create-issue.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditIssue} />
        <Route path="/create" component={CreateIssue} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
