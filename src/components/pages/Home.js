import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import Homepage from "./Homepage";
import Homepage2 from "./Homepage2";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Home() {
	const { userData } = useContext(UserContext);

	return (
		<div>
			{userData.user ? (
				<div>
					<h1 class="tagline1">Welcome {userData.user.displayName}!</h1>
					<Homepage />
					<Homepage2 />
				</div>
			) : (
				<div>
					<Homepage />
					<Homepage2 />
				</div>
			)}
		</div>
	);
}
