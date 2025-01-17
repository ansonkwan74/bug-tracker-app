import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      date: new Date(),
      deadline: new Date(),
      completed: false,
      completionDate: new Date(),
      users: [],
      resolution: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/issues/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          date: new Date(res.data.date),
          deadline: new Date(res.data.deadline),
          completed: res.data.completed,
          completionDate: new Date(res.data.completionDate),
          resolution: res.data.resolution,
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
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
    const issue = {
      username: this.state.username,
      description: this.state.description,
      date: this.state.date,
      deadline: this.state.deadline,
      completed: this.state.completed,
      completionDate: this.state.completionDate,
      resolution: this.state.resolution,
    };

    console.log(issue);

    axios
      .post(
        "http://localhost:5000/issues/update/" + this.props.match.params.id,
        issue
      )
      .then((res) => console.log(res.data));
    setTimeout(() => (window.location = "/"), 100);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update");
  }
  render() {
    return (
      <div>
        <h3>Edit Issue</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Reassign To: </label>
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
              value="Edit Issue Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
