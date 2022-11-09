import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

export function Navbar({ user }) {
	const onLoggedOut = () => {
		localStorage.clear();
		window.open('/', '_self');
	};

	const isAuth = () => {
		if (typeof window == 'undefined') {
			return false;
		}
		if (localStorage.getItem('token')) {
			return localStorage.getItem('token');
		} else {
			return false;
		}
	};

	return (
		<div className="navbar-container">
			<div className="navbar-logo">
				<h1>MikeFlix</h1>
			</div>
			<div className="navbar-links-container">
				{isAuth() && (
					<Link className="nav-link" to="/">
						Home
					</Link>
				)}
				{isAuth() && (
					<Link className="nav-link" to={`/users/${user}`}>
						{user}
					</Link>
				)}

				{isAuth() && <button onClick={onLoggedOut}>Logout</button>}
				{!isAuth() && (
					<Link className="nav-link" to="/">
						Sign-in
					</Link>
				)}
				{!isAuth() && (
					<Link className="nav-link" to="/register">
						Sign-up
					</Link>
				)}
			</div>
		</div>
	);
}
