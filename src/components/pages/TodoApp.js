import React, { Component } from "react";
import css from "./Homepage.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newItem: "",
			list: [],
		};
	}

	updateInput(key, value) {
		this.setState({
			[key]: value,
		});
	}

	addItem() {
		//tao item
		const newItem = {
			id: 1 + Math.random(),
			value: this.state.newItem.slice(),
		};
		//copy
		const list = [...this.state.list];
		//update
		list.push(newItem);
		//update state
		this.setState({
			list,
			newItem: "",
		});
	}
	deleteItem(id) {
		const list = [...this.state.list];
		const updatedList = list.filter((item) => item.id !== id);
		this.setState({ list: updatedList });
	}

	render() {
		return (
			<div className="App">
				<div>
					<h2 class="namageschedule"> Manage your weekly schedule </h2>
					<br />
					<input class="placeholder" type="text" placeholder="Add more task..." value={this.state.newItem} onChange={(e) => this.updateInput("newItem", e.target.value)} />
					<button class="buttonadd" onClick={() => this.addItem()}>
						Add
					</button>
					<br />
					<ul>
						{this.state.list.map((item) => {
							return (
								<li key={item.id}>
									{item.value}
									<button onClick={() => this.deleteItem(item.id)}> x </button>
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
