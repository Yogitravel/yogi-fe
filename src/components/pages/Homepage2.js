import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import css from "./Homepage.css";

export default function Homepage2() {
	return (
		<div>
			<div className="page2">
				<div>
					<section class="thuong-companyreview">
						<h1 class="thuong-title d-none d-sm-block"> Because when you do good, you feel good.</h1>

						<ul class="thuong-list row">
							<li class="thuong-number-text col-12 col-md-4">
								<div class="thuong-number"> 1</div>
								<div> Sign up to be member of Thuong App community, enjoy your 1 week trial</div>
							</li>

							<li class="thuong-number-text col-12 col-md-4">
								<div class="thuong-number"> 2</div>
								<div> Become a pro-member to access more programs </div>
							</li>
							<li class="thuong-number-text col-12 col-md-4">
								<div class="thuong-number"> 3</div>
								<div> Manage your daily task and work out in one app</div>
							</li>
						</ul>
					</section>
					<Container>
						<Row>
							<Col xs={6}>
								<div>
									<h2 class="introduce-the-app">
										Thuong App helps you to build a balanced lifestyle easily by blending healthy habits into your every day schedule. Set reminders, get workout updates and plan the little things
										that make life richer all in one place
									</h2>
									<Link class="button-linkprograms" to="/programs">
										<Button class="buttontoprogram" variant="info">
											SEE All PROGRAMS
										</Button>
									</Link>
									<br />
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</div>
	);
}
