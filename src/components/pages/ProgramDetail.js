import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useParams } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import UserContext from "../../context/UserContext";
import css from "./Homepage.css";

const ProgramDetail = () => {
	const { id } = useParams();
	const [programdetail, setProgramDetail] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`${process.env.REACT_APP_SERVER}/programs/${id}`);
			const response = await data.json();
			console.log(response);
			setProgramDetail(response);
		}
		fetchData();
	}, []);

	const opts = {
		height: "400",
		width: "900",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};

	return (
		<div class="pageprogramdetail">
			<br />
			<Card style={{ width: "65rem" }}>
				<Card.Body>
					<Card.Title class="card_title1">{programdetail.title}</Card.Title>
					<Card.Text class="card_text1">
						<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-peace-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M14 13.292A8 8 0 0 0 8.5.015v7.778l5.5 5.5zm-.708.708L8.5 9.206v6.778a7.967 7.967 0 0 0 4.792-1.986zM7.5 15.985V9.207L2.708 14A7.967 7.967 0 0 0 7.5 15.985zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5z" />
						</svg>
						{programdetail.level}
					</Card.Text>
					<Card.Text class="card_text1">
						<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M5.5.5A.5.5 0 0 1 6 0h4a.5.5 0 0 1 0 1H9v1.07a7.002 7.002 0 0 1 3.537 12.26l.817.816a.5.5 0 0 1-.708.708l-.924-.925A6.967 6.967 0 0 1 8 16a6.967 6.967 0 0 1-3.722-1.07l-.924.924a.5.5 0 0 1-.708-.708l.817-.816A7.002 7.002 0 0 1 7 2.07V1H5.999a.5.5 0 0 1-.5-.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1zm-5 4a.5.5 0 0 0-1 0v3.882l-1.447 2.894a.5.5 0 1 0 .894.448l1.5-3A.5.5 0 0 0 8.5 9V5z"
							/>
						</svg>
						{programdetail.duration}
					</Card.Text>
					<Card.Text class="card_text1">{programdetail.description}</Card.Text>
				</Card.Body>
				<Card.Body>
					<Link class="button-linkprograms" to={`/programs/${id}/todo`}>
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
					<Link class="button-linkprograms" to={`/programs/${id}/todo`}>
						<Button variant="info"> ADD TO MY TODO LIST</Button>
					</Link>
				</Card.Body>
			</Card>
		</div>
	);
};
export default ProgramDetail;
