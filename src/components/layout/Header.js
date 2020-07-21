import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
	return (
		<div>
			<header id="header">
				<div class="row">
					<Link to="/">
						<h1 className="title">THUONG APP</h1>
					</Link>
				</div>

				<div>
					<AuthOptions />
				</div>
			</header>
		</div>
	);
}
