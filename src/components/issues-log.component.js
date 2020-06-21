import React, { Component } from "react";
import axios from "axios";
import CompletedIssue from "./completed-issue.component";
import UnresolvedIssue from "./unresolved-issue.component";

export default class IssuesLog extends Component {
  constructor(props) {
    super(props);
    this.state = { issues: [], completed: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/issues/")
      .then((res) => {
        this.setState({
          issues: res.data.filter((el) => el.completed !== true),
          completed: res.data.filter((el) => el.completed === true),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  issueResolvedStateUpdate = (id, issue) => {
    this.setState({
      //Only returns elements that do not have the 'id' from the parameter
      issues: this.state.issues.filter((el) => el._id !== id),
      completed: [...this.state.completed, issue],
    });
  };

  deleteIssue = (id) => {
    axios
      .delete("http://localhost:5000/issues/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      //Only returns elements that do not have the 'id' from the parameter
      issues: this.state.issues.filter((el) => el._id !== id),
      completed: this.state.completed.filter((el) => el._id !== id),
    });
  };

  issuesLog() {
    return this.state.issues.map((currentissue) => {
      return (
        <UnresolvedIssue
          issue={currentissue}
          deleteIssue={this.deleteIssue}
          issueResolvedStateUpdate={this.issueResolvedStateUpdate}
          key={currentissue._id}
        />
      );
    });
  }

  completedLog() {
    return this.state.completed.map((currentissue) => {
      return (
        <CompletedIssue
          issue={currentissue}
          deleteIssue={this.deleteIssue}
          key={currentissue._id}
        />
      );
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update");
  }

  render() {
    return (
      <div>
        <div>
          <h3>Issues Log</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Dev</th>
                <th>Description</th>
                <th>Date Logged</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.issuesLog()}</tbody>
          </table>
        </div>

        <div>
          <h3>Resolved</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Dev</th>
                <th>Description</th>
                <th>Date</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.completedLog()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
