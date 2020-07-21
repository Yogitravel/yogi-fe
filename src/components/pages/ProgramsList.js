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
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
			<h1 class="thuong-title2 d-none d-sm-block"> Selec a program below to start your new healthy journey</h1>

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
				<Card.Body class="card_content">
					<Card.Title class="card_title">{title}</Card.Title>
					<Card.Text class="card_text">
						<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-peace-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M14 13.292A8 8 0 0 0 8.5.015v7.778l5.5 5.5zm-.708.708L8.5 9.206v6.778a7.967 7.967 0 0 0 4.792-1.986zM7.5 15.985V9.207L2.708 14A7.967 7.967 0 0 0 7.5 15.985zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5z" />
						</svg>
						<span> </span>
						{level}
					</Card.Text>
					<Card.Text class="card_text">{description}</Card.Text>
				</Card.Body>

				<Link class="button-linkprograms" to={`/programs/${_id}`}>
					<Button variant="info">VIEW MORE</Button>
				</Link>
			</Card>
			<br />
		</>
	);
};

export default ProgramsList;
