import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container } from "react-bootstrap";

const ProgramsList = () => {
	const [programs, setPrograms] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await fetch("http://localhost:3001/programs");
			const reponse = await data.json();
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
			<h1> Programs List </h1>
			{programs.map((e) => (
				<CardDeck>
					<Program {...e} />
				</CardDeck>
			))}
		</div>
	);
};

const Program = ({ title, pictureURL, level, duration, description }) => {
	return (
		<>
			<div>
				<Card>
					<Card.Img variant="top" src={pictureURL} />
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text>{level}</Card.Text>
						<Card.Text>{duration}</Card.Text>
						<Card.Text>{description}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
			</div>
		</>
	);
};

export default ProgramsList;
