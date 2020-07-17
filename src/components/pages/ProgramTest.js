import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Program = () => {
	return (
		<div>
			<div>
				<Container>
					<Row>
						<Col sm={8}>
							<h1>
								{" "}
								YOUR TASKS THIS WEEK <br />
								DRAG THE TASK TO YOUR WEEK CALENDAR
							</h1>

							<ButtonGroup vertical>
								<Button>5 Minutes Yoga for Core</Button> <br />
								<Button>Button</Button>
								<br />
								<Button>Button</Button>
								<br />
								<Button>Button</Button>
								<br />
								<Button>Button</Button>
								<br />
								<Button>Button</Button>
								<br />
							</ButtonGroup>
						</Col>

						<Col sm={4}>
							<h1> YOUR WEEK CALENDAR</h1>
							<ButtonGroup vertical>
								<Button>MONDAY</Button> <br />
								<Button>TUESDAY</Button>
								<br />
								<Button>WEDNESDAY</Button>
								<br />
								<Button>THURSDAY</Button>
								<br />
								<Button>FRIDAY</Button>
								<br />
								<Button>SATURDAY</Button>
								<br />
								<Button>SUNDAY</Button>
								<br />
							</ButtonGroup>
						</Col>
					</Row>
				</Container>

				<br />
			</div>
		</div>
	);
};

export default Program;
