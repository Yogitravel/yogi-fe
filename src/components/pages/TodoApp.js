import React, { Component } from "react";
import css from "./Homepage.css";
import Button from "@material-ui/core/Button";
import { Checkbox } from "@material-ui/core";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newItem: "",
			list: [],
		};
	}
	// componentDidMount() {
	// 	this.setState({ list: this.props.todos });
	// }

	updateInput(key, value) {
		this.setState({
			[key]: value,
		});
	}

	addItem() {
		//tao item
		const newItem = {
			id: 1 + Math.random(),
			name: this.state.newItem,
		};
		//copy
		const list = [...this.props.right, ...this.props.todos];
		console.log("HDKAHDKHADHKAHDKHAHDKHDHAKHDAHDHA", list);
		//update
		list.push(newItem);
		this.props.setTodos(list);
		//update state

		this.setState({
			newItem: "",
		});
	}

	render() {
		return (
			<div className="App">
				<div>
					<input class="placeholder" type="text" placeholder="Add more tasks..." value={this.state.newItem} onChange={(e) => this.updateInput("newItem", e.target.value)} />
					<button class="buttonadd" onClick={() => this.addItem()}>
						Add
					</button>
					<br />
					<ul>
						{this.props.todos.map((item) => {
							return (
								<div>
									{" "}
									<li key={item.id}>
										<Checkbox />
										{item.name}
									</li>
								</div>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
