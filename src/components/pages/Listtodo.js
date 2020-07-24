import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./Homepage.css";
import TodoApp from "./TodoApp";
import ModalVideo from "react-modal-video";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 450,
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
	const [todos, setTodos] = React.useState([]);
	const classes = useStyles();
	const [checked, setChecked] = React.useState([]);
	const [left, setLeft] = React.useState([]);
	const [right, setRight] = React.useState([]);
	const id = useParams().id;
	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);
	const [openmodal, setOpenmodal] = React.useState(false);
	const [selectedVideo, setSelectedVideo] = useState("");

	useEffect(() => {
		async function fetchData() {
			const foo = await Promise.all([fetchLeft(), fetchTodos()]);
			console.log(foo, "FOOOOOO");
			let r = foo[1];
			let l = foo[0].filter((e) => !r.map((el) => el.name).includes(e.name));
			setRight(r);
			setLeft(l);
		}
		fetchData();
	}, []);

	async function fetchTodos() {
		try {
			const res = await fetch(process.env.REACT_APP_SERVER + `/todos`, {
				headers: {
					"x-auth-token": `${localStorage.getItem("auth-token")}`,
				},
				method: "GET",
			});
			const dt = await res.json();
			console.log(dt);
			return dt;
		} catch (er) {
			console.log(er);
			return null;
		}
	}

	async function fetchLeft() {
		const data = await fetch(`${process.env.REACT_APP_SERVER}/programs/${id}`);
		const response = await data.json();
		return response.videoURLList;
	}

	async function saveTodos() {
		console.log(right);
		const body = right.map((e) => (e.url ? { url: e.url, name: e.name } : { url: e.url, name: e.name }));

		try {
			const res = await fetch(process.env.REACT_APP_SERVER + `/todos`, {
				headers: {
					"x-auth-token": `${localStorage.getItem("auth-token")}`,
					"content-type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ tasks: body }),
			});
			const dt = await res.json();
			console.log("saved successfully", dt);
			setRight(dt);
		} catch (er) {
			console.log(er);
		}
	}

	// // Day la de cross throught the done task
	// const toggle = (index) => {
	// 	todos[index].isDone = true;
	// 	saveTodos(todos);
	// };

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

	console.log(todos, "day la gi");
	const customList = (title, items) => (
		<Card>
			{console.log("tt", title, "ii", items)}

			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem key={value} role="listitem" button>
							<div class="listitemdata" onClick={handleToggle(value)}>
								<ListItemIcon>
									<Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
								</ListItemIcon>
							</div>
							<div> {value.name} </div>

							<br />
							<div class="listitemdata1">
								{value.url && (
									<Button>
										<svg
											onClick={() => {
												setSelectedVideo(value.url.split("watch?v=")[1].split("&")[0]);
												setOpenmodal(true);
											}}
											width="1.5em"
											height="1.5em"
											viewBox="0 0 16 16"
											class="bi bi-display"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75z" />

											<path
												fill-rule="evenodd"
												d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"
											/>
										</svg>
									</Button>
								)}
							</div>
							<br />
							{/* tao function de click danh dau la done cross */}
							<div>
								<Button
									onClick={() => {
										console.log("day la index so may");
									}}
								>
									<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
									</svg>
								</Button>
							</div>
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<div class="todopage">
			<ModalVideo channel="youtube" isOpen={openmodal} videoId={selectedVideo} onClose={() => setOpenmodal(false)} />

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
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
								</svg>
								to cross your done tasks
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
					<h2 class="titletask1">YOGA TASKS</h2>
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
						<Button variant="outlined" size="small" className={classes.button} onClick={saveTodos} aria-label="move selected left">
							Save
						</Button>
					</Grid>
				</Grid>

				<Grid item>
					<h2 class="titletask2"> MY WEEK PLAN</h2>
					<br />
					<TodoApp todos={todos} right={right} setTodos={setRight} />
					{customList("Thuong's task", [...right])}
				</Grid>
			</Grid>
		</div>
	);
}
