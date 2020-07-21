import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import css from "./Homepage.css";
import { red } from "@material-ui/core/colors";
import TodoApp from "./TodoApp";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 250,
		height: 430,
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export default function TransferList() {
	const [tasks, setTasks] = React.useState([]);
	const classes = useStyles();
	const [checked, setChecked] = React.useState([]);
	const [left, setLeft] = React.useState([]);
	const [right, setRight] = React.useState([]);
	const id = useParams().id;
	console.log(id, "day la id cua todolist");
	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	// const [programdetail, setProgramDetail] = useState([]);
	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const data = await fetch(`http://localhost:3001/programs/${id}`);
	// 			const response = await data.json();
	// 			console.log(response, "day la DATA gui qua todo");
	// 			setProgramDetail(response);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);

	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`http://localhost:3001/programs/${id}`);
			const response = await data.json();
			console.log(response);
			setTasks(response.videoURLList);
			setLeft(response.videoURLList);
			console.log(response.videoURLList);
		}
		fetchData();
	}, []);

	const customList = (title, items) => (
		<Card>
			{console.log("tt", title, "ii", items)}

			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
							</ListItemIcon>
							{value.name}

							{/* {programdetail.videoURLList.map((x) => x.name)} */}

							<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-display" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75z" />
								<path
									fill-rule="evenodd"
									d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"
								/>
							</svg>
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<div class="todopage">
			<div>
				<section>
					<h1 class="thuong-title1 d-none d-sm-block"> "You are what you do, not what you say you'll do"</h1>

					<ul class="thuong-list row">
						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 1</div>
							<div> Select your yoga tasks for the week</div>
						</li>

						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 2</div>
							<div> Move each task into your weekly schedule </div>
						</li>
						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 3</div>
							<div> Click ADD to add new todo tasks</div>
						</li>
						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 4</div>
							<div> Drag up and down to adjust the priority</div>
						</li>
						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 5</div>
							<div>
								{" "}
								Click on the{" "}
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
									<path
										fill-rule="evenodd"
										d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
									/>
								</svg>{" "}
								to delete your tasks
							</div>
						</li>
						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 6</div>
							<div>
								{" "}
								Click on the{" "}
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-display" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75z" />
									<path
										fill-rule="evenodd"
										d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"
									/>
								</svg>{" "}
								to play the video{" "}
							</div>
						</li>
					</ul>
				</section>
			</div>
			<Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
				<Grid item>
					<h2 class="titletask1"> Your Yoga tasks this week</h2>
					<br />
					<br />
					{customList("Click to select the tasks", left)}
				</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Button variant="outlined" size="small" className={classes.button} onClick={handleCheckedRight} disabled={leftChecked.length === 0} aria-label="move selected right">
							&gt;
						</Button>
						<Button variant="outlined" size="small" className={classes.button} onClick={handleCheckedLeft} disabled={rightChecked.length === 0} aria-label="move selected left">
							&lt;
						</Button>
					</Grid>
				</Grid>

				<Grid item>
					<h2 class="titletask2"> Manage your weekly schedule </h2>
					<br />
					<TodoApp />
					{customList("Thuong's task", right)}
				</Grid>
			</Grid>
		</div>
	);
}
