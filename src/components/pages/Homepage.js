import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import css from "./Homepage.css";

export default function Homepage() {
	return (
		<div className="page1">
			<div class="hometitle">
				<Container>
					<Row>
						<Col xs={9}>
							<h1 class="tagline">
								{" "}
								Healthy Habits <br />
								Made Simple{" "}
							</h1>
							<div class="list">
								<li> Fun, varied workouts </li>
								<li> Healthy & personalised meals </li>
								<li> Sleep meditation </li>
								<li> Whole-body health </li>{" "}
							</div>

							<Link class="button1" to="/register">
								<Button variant="info">TRY FOR FREE</Button>
							</Link>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}
