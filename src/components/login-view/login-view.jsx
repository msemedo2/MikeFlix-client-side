import React, { useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr('Username Required');
			isReq = false;
		} else if (username.length < 5) {
			setUsernameErr('Username must be at least 5 characters long');
			isReq = false;
		}
		if (!password) {
			setPasswordErr('Password Required');
			isReq = false;
		} else if (password.length < 6) {
			setPasswordErr('Password must be at least 6 characters long');
			isReq = false;
		}
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();

		if (isReq) {
			axios
				.post('https://mikeflix2.herokuapp.com/login', {
					Username: username,
					Password: password,
				})
				.then((response) => {
					const data = response.data;
					props.onLoggedIn(data);
				})
				.catch((err) => {
					console.log(err);
					alert('User was not found');
				});
		}
	};

	return (
		<div className="login-view-container">
			<h1>Sign In</h1>
			<form className="login-form">
				<label className="input-container">
					<input
						type="text"
						value={username}
						required
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					{usernameErr && <p className="error-message">{usernameErr}</p>}
				</label>
				<label className="input-container">
					<input
						type="password"
						value={password}
						required
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{passwordErr && <p className="error-message">{passwordErr}</p>}
				</label>
				<button className="login-button" type="submit" onClick={handleSubmit}>
					Login
				</button>
			</form>
		</div>
	);
}

LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, { setUser })(LoginView);
