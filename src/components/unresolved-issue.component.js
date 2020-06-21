import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class UnresolvedIssue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCompletionTriggered: false,
		};
	}

	render() {
		return (
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
						}}>
						delete
					</a>{" "}
					|{" "}
					<a
						href="#"
						onClick={() => {
							this.props.markAsComplete(this.props.issue._id);
						}}>
						complete
					</a>
				</td>
			</tr>
		);
	}
}
