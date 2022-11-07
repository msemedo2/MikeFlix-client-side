import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

	const validate = () => {
		let isReq = true;
		if (username === '') {
			setUsernameErr('Username required');
			isReq = false;
		} else if (username.length < 5) {
			setUsernameErr({
				usernameErr: 'Username must be at least 5 characters long',
			});
			isReq = false;
		}
		if (!password) {
			setPasswordErr('Password required');
			isReq = false;
		} else if (password.match(/[^0-9a-z]/i)) {
			setPasswordErr('Password may only contain letters and digits');
			isReq = false;
		}
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			axios
				.post('https://mikeflix2.herokuapp.com/users', {
					Username: username,
					Password: password,
				})
				.then((response) => {
					const data = response.data;
					console.log(response.data);
					alert('Registration successful, please login!');
					window.open('/', '_self');
				})
				.catch((err) => {
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
					alert('unable to register');
				});
		}
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
						placeholder="Username"
						required
					/>
					{usernameErr && <p>{usernameErr}</p>}
				</label>
				<label className="input-container">
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
					{passwordErr && <p>{passwordErr}</p>}
				</label>
				<button
					className="registration-button"
					type="submit"
					onClick={handleSubmit}
				>
					Register
				</button>
			</form>
		</div>
	);
}

// RegistrationView.propTypes = {
// 	register: PropTypes.shape({
// 		Username: PropTypes.string.isRequired,
// 		Password: PropTypes.string.isRequired,
// 	}),
// };
