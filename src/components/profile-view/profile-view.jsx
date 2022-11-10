import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './profile-view.scss';

export class ProfileView extends React.Component {
	constructor() {
		super();
		this.state = {
			Username: null,
			Password: null,
			FavoriteMovies: [],
			movies: [],
		};
	}

	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		this.getUser(accessToken);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
		window.open('/', '_self');
	}

	getUser = (token) => {
		const user = localStorage.getItem('user');
		axios
			.get(`https://mikeflix2.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					Username: response.data.Username,
					FavoriteMovies: response.data.FavoriteMovies,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	editUser = (e) => {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios
			.put(
				`https://mikeflix2.herokuapp.com/users/${user}`,
				{
					Username: this.state.Username,
					Password: this.state.Password,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((response) => {
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
				});

				localStorage.setItem('user', this.state.Username);
				const data = response.data;
				alert('Profile is updated!');
				window.open('/');
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	onRemoveFavorite = (movie) => {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');

		axios
			.delete(
				`https://mikeflix2.herokuapp.com/users/${user}/movies/${movie._id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((response) => {
				alert('Movie removed from Favorite Movies!');
				this.componentDidMount();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	onDeleteUser() {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');

		axios
			.delete(`https://mikeflix2.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				alert('Profile has been deleted');
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.open(`/`, '_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	setUsername(value) {
		this.setState({
			Username: value,
		});
		this.Username = value;
	}

	setPassword(value) {
		this.setState({
			Password: value,
		});
		this.Password = value;
	}

	render() {
		const { movies } = this.props;
		const { FavoriteMovies, Username } = this.state;

		return (
			<div className="profile-container">
				<h1>User Profile</h1>
				<h2>Update Profile</h2>
				<form
					className="form-container"
					onSubmit={(e) => this.editUser(e, this.Username, this.Password)}
				>
					<input
						type="text"
						name="username"
						placeholder="New Username"
						onChange={(e) => this.setUsername(e.target.value)}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="New Password"
						onChange={(e) => this.setPassword(e.target.value)}
						required
					/>
					<button
						className="update-button"
						type="submit"
						onClick={() => this.editUser()}
					>
						Update User
					</button>
					<h2>Delete Profile</h2>
					<button className="delete-button" onClick={() => this.onDeleteUser()}>
						Delete User
					</button>
				</form>
				<h2>Favorite Movies</h2>
				<div className="movie-container">
					{FavoriteMovies.length === 0 && <div>No Favorite Movies</div>}
					{FavoriteMovies.length > 0 &&
						movies.map((movie) => {
							if (
								movie._id === FavoriteMovies.find((fav) => fav === movie._id)
							) {
								return (
									<div key={movie._id}>
										<Link to={`/movies/${movie._id}`}>
											<div className="favs-container">
												<img
													className="fav-img"
													src={movie.ImagePath}
													crossOrigin="anonymous"
													alt={movie.Title}
												/>
											</div>
										</Link>
										<div className="title-container">
											<div className="info">
												<p className="">{movie.Title}</p>
												<button
													className="remove-button"
													value={movie._id}
													onClick={() => this.onRemoveFavorite(movie)}
												>
													Remove
												</button>
											</div>
										</div>
									</div>
								);
							}
						})}
				</div>
				<button
					className="back-btn"
					onClick={() => {
						onBackClick(null);
					}}
				>
					Back
				</button>
			</div>
		);
	}
}
