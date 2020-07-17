import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
	return (
		<div>
			<header id="header">
				<Link to="/">
					<h1 className="title">THUONG APP</h1>
				</Link>

				<div>
					<AuthOptions />
				</div>
			</header>
		</div>
	);
}
