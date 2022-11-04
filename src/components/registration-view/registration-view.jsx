import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthDate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthdate);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onRegistration(username);
	};

	return (
		<div className="registration-view-container">
			<h1>Sign Up</h1>
			<form className="registration-form">
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
				<label className="input-container">
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label className="input-container">
					BirthDate:
					<input
						type="date"
						value={birthdate}
						onChange={(e) => setBirthDate(e.target.value)}
					/>
				</label>
				<button
					className="registration-button"
					type="submit"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
		</div>
	);
}

RegistrationView.propTypes = {
	onRegistration: PropTypes.func.isRequired,
};
