import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";

const ProgramDetail = () => {
	const { id } = useParams();
	const [programdetail, setProgramDetail] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`http://localhost:3001/programs/${id}`);
			const response = await data.json();
			console.log(response);
			setProgramDetail(response);
		}
		fetchData();
	}, []);
	const opts = {
		height: "390",
		width: "1000",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};
	return (
		<div>
			<br />
			<Card style={{ width: "65rem" }}>
				<Card.Body>
					<Card.Title class="card_title1">{programdetail.title}</Card.Title>
					<Card.Text class="card_text1">{programdetail.description}</Card.Text>
				</Card.Body>
				<Card.Body>
					<Link class="button-linkprograms" to={`/listtodo`}>
						<Button variant="info"> ADD TO MY TODO LIST</Button>
					</Link>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						{programdetail.videoURLList &&
							programdetail.videoURLList.map((x) => {
								let a = x.url.split("watch?v=")[1].split("&")[0];
								console.log(a);
								return (
									<Card.Text>
										<YouTube
											videoId={a} // defaults -> null
											// id={string}                       // defaults -> null
											// className={string}                // defaults -> null
											// containerClassName={string}       // defaults -> ''
											opts={opts} // defaults -> {}
											// onReady={func}                    // defaults -> noop
											// onPlay={func}                     // defaults -> noop
											// onPause={func}                    // defaults -> noop
											// onEnd={func}                      // defaults -> noop
											// onError={func}                    // defaults -> noop
											// onStateChange={func}              // defaults -> noop
											// onPlaybackRateChange={func}       // defaults -> noop
											// onPlaybackQualityChange={func}    // defaults -> noop
										/>
										{/* {x.name} {x.url}{" "} */}
									</Card.Text>
								);
							})}
					</ListGroupItem>
				</ListGroup>
				<Card.Body>
					<Link class="button-linkprograms" to={`/listtodo`}>
						<Button variant="info"> ADD TO MY TODO LIST</Button>
					</Link>
				</Card.Body>
			</Card>
		</div>
	);
};
export default ProgramDetail;
