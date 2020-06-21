import React, { Component, Fragment } from "react";

export default class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewTriggered: false,
    };
  }

  componentDidMount() {
    if (this.state.isViewTriggered) {
      return <div>yeet</div>;
    }
  }

  triggerView = () => {
    this.setState((prevState) => ({
      isViewTriggered: !prevState.isViewTriggered,
    }));

    console.log(this.state);
  };

  displayResolution = () => {
    if (this.state.isViewTriggered) {
      return <td>{this.props.issue.resolution}</td>;
    }
  };

  render() {
    return (
      <Fragment>
        <tr>
          <td>{this.props.issue.username}</td>
          <td>{this.props.issue.description}</td>
          <td>{this.props.issue.date.substring(0, 10)}</td>
          <td>{this.props.issue.completionDate.substring(0, 10)}</td>
          <td>
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
                this.triggerView();
              }}
            >
              view
            </a>
          </td>
        </tr>
        {this.displayResolution()}
      </Fragment>
    );
  }
}
