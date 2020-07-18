import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgramDetail from "./ProgramDetail";
import { useHistory } from "react-router-dom";
import css from "./Homepage.css";

const ProgramsList = () => {
	const [programs, setPrograms] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await fetch("http://localhost:3001/programs");
			const reponse = await data.json();
			console.log(reponse);
			setPrograms(reponse.data);
		}
		fetchData();
	}, []);
	return (
		<div>
			<br />
			<div>
				<Jumbotron fluid class="jumbotron">
					<Container>
						<h1 class="quote">" You are what you do, not what you say you'll do "</h1>
						<p>Thuong App help you build your healthy life style easier by blending small workout tasks into your every day schedule.</p>
						<p> Selec a program below to start your new journey</p>
					</Container>
				</Jumbotron>
			</div>
			<h1> Check out all the Programs List </h1>
			<CardDeck>
				<Container>
					<Row>
						{programs.map((e) => (
							<Col xs={12} md={4}>
								<Program {...e} />
							</Col>
						))}
					</Row>
				</Container>
			</CardDeck>
		</div>
	);
};

// function DetailPageButton() {
// 	let history = useHistory();

// function MovetoDetailPage() {
// 	  history.push("/programs/${id}");
// 	}

const Program = ({ title, pictureURL, level, description, _id }) => {
	return (
		<>
			<Card class="card">
				<Card.Img variant="top" src={pictureURL} />
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{level}</Card.Text>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<button type="button">
						Go to Program Detail
						<small className="text-muted">{_id} day la ID cua Program nay START YOUR NEW LIFE STYLE NOW! </small>
					</button>
				</Card.Footer>
			</Card>

			<br />
		</>
	);
};

export default ProgramsList;
