import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import css from "../pages/Homepage.css";

export default function Register() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordCheck, setPasswordCheck] = useState();
	const [displayName, setDisplayName] = useState();
	const [error, setError] = useState();

	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	const submit = async (e) => {
		e.preventDefault();
		try {
			const newUser = { email, password, passwordCheck, displayName };
			const response = await Axios.post("http://localhost:3001/users/register", newUser);
			setUserData({
				token: response.data.token,
				user: response.data.user,
			});
			localStorage.setItem("auth-token", response.data.token);
			history.push("/");
		} catch (err) {
			console.log(err.response);
			err.response.data.msg && setError(err.response.data.msg);
		}
	};

	return (
		<div className="pageregister">
			<h2>Register</h2>
			{error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
			<form className="form" onSubmit={submit}>
				<label htmlFor="register-email">Email</label>
				<input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)} />

				<label htmlFor="register-password">Password</label>
				<input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)} />
				<input type="password" placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)} />

				<label htmlFor="register-display-name">Display name</label>
				<input id="register-display-name" type="text" onChange={(e) => setDisplayName(e.target.value)} />

				<input type="submit" value="Register" />
			</form>
		</div>
	);
}
