import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class UnresolvedIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompletionTriggered: false,
      username: "",
      description: "",
      date: new Date(),
      deadline: new Date(),
      completionDate: new Date(),
      resolution: "",
    };
  }

  onChangeResolution = (e) => {
    this.setState({
      resolution: e.target.value,
    });
  };

  triggerCompletion = () => {
    this.setState((prevState) => ({
      isCompletionTriggered: !prevState.isCompletionTriggered,
    }));

    console.log(this.state);
  };

  displayResolutionForm = () => {
    if (this.state.isCompletionTriggered) {
      return (
        <Fragment>
          <td colspan="3">
            <form onSubmit={this.onSubmit}>
              <div className="form-group sm">
                <label>Resolution: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.resolution}
                  onChange={this.onChangeResolution}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Complete"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </td>
        </Fragment>
      );
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const issue = {
      _id: this.props.issue._id,
      username: this.props.issue.username,
      description: this.props.issue.description,
      date: this.props.issue.date,
      deadline: this.props.issue.deadline,
      completed: true,
      completionDate: this.props.issue.completionDate,
      resolution: this.state.resolution,
    };

    console.log(issue);

    axios
      .post(
        "http://localhost:5000/issues/update/" + this.props.issue._id,
        issue
      )
      .then((res) => console.log(res.data));

    this.props.issueResolvedStateUpdate(this.props.issue._id, issue);
  };

  render() {
    return (
      <Fragment>
        <tr>
          <td>{this.props.issue.username}</td>
          <td>{this.props.issue.description}</td>
          <td>{this.props.issue.date.substring(0, 10)}</td>
          <td>{this.props.issue.deadline.substring(0, 10)}</td>
          <td>
            <Link to={"/edit/" + this.props.issue._id}>edit</Link> |{" "}
            <a
              href="#"
              onClick={() => {
                this.props.deleteIssue(this.props.issue._id);
              }}
            >
              delete
            </a>{" "}
            |{" "}
            <a
              href="#"
              onClick={() => {
                this.triggerCompletion();
              }}
            >
              resolve
            </a>
          </td>
        </tr>
        {this.displayResolutionForm()}
      </Fragment>
    );
  }
}
