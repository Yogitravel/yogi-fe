import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import css from "./Homepage.css";

export default function AdminPage() {
	return (
		<div>
			<Container>
				<Row>
					<div class="adminprogram">
						<Col>
							<h1> Program </h1>

							<ListGroup.Item>
								1 WEEK YOGA TO BOOST YOUR IMMUSE SYSTEM <br />
								Program Id:
							</ListGroup.Item>
							<ListGroup.Item>
								10 DAYS VINYASA YOGA <br />
								Program Id:
							</ListGroup.Item>
							<ListGroup.Item>
								BALANCE YOUR MIND AND BODY <br />
								Program Id:
							</ListGroup.Item>
							<ListGroup.Item>
								POWER YOGA FOR WEIGHT LOSS <br />
								Program Id:
							</ListGroup.Item>
							<ListGroup.Item>
								RELAX AND REDUCE STRESS Program <br />
								Program Id:
							</ListGroup.Item>
							<ListGroup.Item>
								YOGA TO REDUCE STRESS <br />
								Program Id:{" "}
							</ListGroup.Item>
							<ListGroup.Item>
								YOGA FOR SENIORS <br />
								Program Id:{" "}
							</ListGroup.Item>
							<ListGroup.Item>
								DEEP RELAXING WITH TIBETAN SINGING BOWL <br />
								Program Id:{" "}
							</ListGroup.Item>
							<ListGroup.Item>
								YOGA AND MEDITATION FOR BETTER SLEEP <br />
								Program Id:{" "}
							</ListGroup.Item>
							<ListGroup.Item></ListGroup.Item>
							<ListGroup.Item></ListGroup.Item>
						</Col>
					</div>
					<Col>
						<h1> Program Detail</h1>
						<ListGroup.Item>
							Program Id: <br />
							Title: 1 WEEK YOGA TO BOOST YOUR IMMUSE SYSTEM
							<br />
							Level: <br />
							Duration: <br />
							Description: <br />
							Video URL List:
						</ListGroup.Item>
						<ListGroup.Item>
							Program Id: <br />
							Title: 10 DAYS VINYASA YOGA <br />
							Level: <br />
							Duration: <br />
							Description: <br />
							Video URL List:
						</ListGroup.Item>
					</Col>
					<Col>Users </Col>
				</Row>
			</Container>
		</div>
	);
}
