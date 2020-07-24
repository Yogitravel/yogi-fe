import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import ProgramsList from "./components/pages/ProgramsList";
import Program from "./components/pages/ProgramDetail";
import Listtodo from "./components/pages/Listtodo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import history from "./history";
import ProgramDetail from "./components/pages/ProgramDetail";
import ProtectedRoute from "./utils/ProtectedRoute";
import "../node_modules/react-modal-video/scss/modal-video.scss";

export default function App() {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem("auth-token");
			if (token === null) {
				setLoading(false);
				return;
			}
			const tokenRes = await Axios.post(process.env.REACT_APP_SERVER + "/users/tokenIsValid", null, { headers: { "x-auth-token": token } });
			if (tokenRes.data) {
				const userRes = await Axios.get(process.env.REACT_APP_SERVER + "/users/", {
					headers: { "x-auth-token": token },
				});
				console.log(userRes.data);
				setUserData({
					token,
					user: userRes.data,
				});
			}
			setLoading(false);
		};

		checkLoggedIn();
	}, []);
	console.log(userData);

	if (loading) return <h1>loading spinner</h1>;
	return (
		<>
			<BrowserRouter history={history}>
				<UserContext.Provider value={{ userData, setUserData }}>
					<Header />
					<div>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route exact path="/programs" component={ProgramsList} />
							<ProtectedRoute user={userData} exact path="/programs/:id" component={ProgramDetail} />
							<ProtectedRoute user={userData} path="/programs/:id/todo" component={Listtodo} />
						</Switch>
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	);
}
