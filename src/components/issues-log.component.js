import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Issue = (props) => (
  <tr>
    <td>{props.issue.username}</td>
    <td>{props.issue.description}</td>
    <td>{props.issue.date.substring(0, 10)}</td>
    <td>{props.issue.deadline.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.issue._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteIssue(props.issue._id);
        }}
      >
        delete
      </a>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.markAsComplete(props.issue._id);
        }}
      >
        complete
      </a>
    </td>
  </tr>
);

const Completed = (props) => (
  <tr>
    <td>{props.issue.username}</td>
    <td>{props.issue.description}</td>
    <td>{props.issue.date.substring(0, 10)}</td>
    <td>{props.issue.completionDate.substring(0, 10)}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteIssue(props.issue._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

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

  markAsComplete = (id) => {
    this.state.issues.map((issue) => {
      if (issue._id === id) {
        const currentIssue = {
          _id: issue._id,
          username: issue.username,
          description: issue.description,
          date: issue.date,
          deadline: issue.deadline,
          completed: true,
          completionDate: issue.completionDate,
        };
        axios
          .post("http://localhost:5000/issues/update/" + id, currentIssue)
          .then((res) => console.log(res.data));

        this.setState({
          //Only returns elements that do not have the 'id' from the parameter
          issues: this.state.issues.filter((el) => el._id !== id),
          completed: [...this.state.completed, currentIssue],
        });
        return;
      }
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
        <Issue
          issue={currentissue}
          deleteIssue={this.deleteIssue}
          markAsComplete={this.markAsComplete}
          key={currentissue._id}
        />
      );
    });
  }

  completedLog() {
    return this.state.completed.map((currentissue) => {
      return (
        <Completed
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
