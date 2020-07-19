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
		width: 400,
		height: 430,
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	console.log("a", a, "b", b);
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
	console.log(id);
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

	const customList = (title, items) => (
		<Card>
			{console.log("tt", title, "ii", items)}
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
						disabled={items.length === 0}
						inputProps={{ "aria-label": "all items selected" }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map((value) => {
					console.log(value);
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
							</ListItemIcon>
							{/* <ListItemText id={labelId} primary={`${tasks[value]}`} />

							lay ten va URL video */}
							{value.name}
							{value.url}
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);
	console.log(right, "hehe");

	//lay data tu  program detail
	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`http://localhost:3001/programdetail/5f101c04f2e449ce30fe9c64
			`);
			const response = await data.json();
			console.log(response);
			setTasks(response.videoURLList);
			setLeft(response.videoURLList);
			console.log(response.videoURLList);
		}
		fetchData();
	}, []);

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
							<div> Click on the trash icon to delete your tasks</div>
						</li>
						<li class="thuong-number-text col-12 col-md-4">
							<div class="thuong-number"> 6</div>
							<div> Move the task back to Thuong side if you cant make it </div>
						</li>
					</ul>
				</section>
			</div>
			<Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
				<Grid item>
					<h2 class="titletask1"> Your Yoga task this week</h2>
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
