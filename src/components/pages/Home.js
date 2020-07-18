import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import Homepage from "./Homepage";

export default function Home() {
	const { userData } = useContext(UserContext);

	return (
		<div>
			{userData.user ? (
				<h1>Welcome {userData.user.displayName}</h1>
			) : (
				<div>
					<Homepage />
				</div>
			)}
		</div>
	);
}
