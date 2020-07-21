import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import css from "../pages/Homepage.css";

export default function AuthOptions() {
	const { userData, setUserData } = useContext(UserContext);

	const history = useHistory();

	const register = () => history.push("/register");
	const login = () => history.push("/login");
	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		});
		localStorage.setItem("auth-token", "");
	};

	return (
		<nav className="tions">
			{userData.user ? (
				<button class="loginbutton" onClick={logout}>
					Log out
				</button>
			) : (
				<>
					<button class="registerbutton" onClick={register}>
						Register
					</button>
					<button class="loginbutton " onClick={login}>
						Log in
					</button>
				</>
			)}
		</nav>
	);
}
