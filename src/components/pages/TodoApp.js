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
	deleteItem(id) {
		const list = [...this.props.todos];
		const updatedList = list.filter((item) => item.id !== id);
		this.props.setTodos([...this.props.right, ...this.props.todos, updatedList]);
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
								<li key={item.id}>
									<Checkbox />

									{item.name}
									<button class="deleteicon" onClick={() => this.deleteItem(item.id)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
											<path
												fill-rule="evenodd"
												d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
											/>
										</svg>
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
