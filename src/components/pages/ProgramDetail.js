import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";

const ProgramDetail = () => {
	const { id } = useParams();
	const [programdetail, setProgramDetail] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`http://localhost:3001/programdetail/${id}`);
			const response = await data.json();
			console.log(response);
			setProgramDetail(response);
		}
		fetchData();
	}, []);

	if (programdetail === null) {
		return <h1>LOADING</h1>;
	}
	return (
		<div>
			<br />
			{/* <div>
				<Jumbotron fluid class="jumbotron">
					<Container>
						<h1 class="quote">" You are what you do, not what you say you'll do "</h1>
						<p>Thuong App help you build your healthy life style easier by blending small workout tasks into your every day schedule.</p>
						<p> Selec a program below to start your new journey</p>
					</Container>
				</Jumbotron>
			</div> */}
			<h1> Check out all the Programs List </h1>
			<CardDeck>
				<Container>
					<Card>
						<Card.Body>
							<Card.Title>{programdetail.title}</Card.Title>
							<Card.Text>{programdetail.description}</Card.Text>

							{/* {programdetail.videoURLList.map((x) => {
								return <Card.Text>{x.name}</Card.Text>;
							})} */}
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">START YOUR NEW LIFE STYLE NOW! </small>
						</Card.Footer>
					</Card>
				</Container>
			</CardDeck>
			<a
				onClick={() => {
					console.log(programdetail.videoURLList.map((x) => x.name));
				}}
			>
				AAAAAAAAA
			</a>
		</div>
	);
};

// const ProgramDetails = ({ title, description, videoURLList }) => {
// 	return (
// 		<>
// 			<Card>
// 				<Card.Body>
// 					<Card.Title>{title}</Card.Title>
// 					<Card.Text>{description}</Card.Text>
// 					<Card.Text>{videoURLList}</Card.Text>
// 				</Card.Body>
// 				<Card.Footer>
// 					<small className="text-muted">START YOUR NEW LIFE STYLE NOW! </small>
// 				</Card.Footer>
// 			</Card>

// 			<br />
// 		</>
// 	);
// };

export default ProgramDetail;
