import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
	console.log(props.user, "hehhehe");
	return props.user.user ? <Route {...props} render={() => <Component {...props} />} /> : <Redirect to="/register" />;
}
