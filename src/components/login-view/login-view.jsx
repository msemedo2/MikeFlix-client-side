import React, { useState } from 'react';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onLoggedIn(username);
	};

	return (
		<div className="login-view-container">
			<h1>Sign In</h1>
			<form className="login-form">
				<label className="input-container">
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label className="input-container">
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button className="login-button" type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
}
