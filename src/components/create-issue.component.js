import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      date: new Date(),
      deadline: new Date(),
      completionDate: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      }
    });
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDeadline = (deadline) => {
    this.setState({
      deadline: deadline,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const issue = {
      username: this.state.username,
      description: this.state.description,
      date: this.state.date,
      deadline: this.state.deadline,
      completionDate: this.state.completionDate,
    };

    console.log(issue);

    axios
      .post("http://localhost:5000/issues/add", issue)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Log Issue</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Deadline: </label>
            <div>
              <DatePicker
                selected={this.state.deadline}
                onChange={this.onChangeDeadline}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Log New Issue"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
