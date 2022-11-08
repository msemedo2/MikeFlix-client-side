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
		e.preventDefault();
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
				console.log(data);
				console.log(this.state.Username);
				alert('Profile is updated!');
				window.open('/', '_self');
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
				console.log(response);
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
				console.log(response);
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
			<div>
				<div>
					<h1>USER PROFILE</h1>
				</div>
				<div
					className="update-inputs mt-4 mb-5 bg-dark text-white"
					style={{ borderRadius: '20px' }}
				>
					<h1>UPDATE PROFILE</h1>
					<div>
						<div>
							<form
								onSubmit={(e) => this.editUser(e, this.Username, this.Password)}
							>
								<label>New Username</label>
								<input
									type="text"
									name="username"
									className="bg-dark"
									placeholder="New Username"
									onChange={(e) => this.setUsername(e.target.value)}
									required
								/>
								<label>New Password</label>
								<input
									type="password"
									name="password"
									className="bg-dark"
									placeholder="New Password"
									onChange={(e) => this.setPassword(e.target.value)}
									required
								/>

								<div className="mb-4">
									<button type="submit" onClick={() => this.editUser()}>
										Update User
									</button>
									<button
										className="delete-button"
										onClick={() => this.onDeleteUser()}
									>
										Delete User
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="bg-dark text-white">
					<div>
						<h4>Favorite Movies</h4>
					</div>
					<div>
						{FavoriteMovies.length === 0 && <div>No Favorite Movies</div>}
						{FavoriteMovies.length > 0 &&
							movies.map((movie) => {
								if (
									movie._id === FavoriteMovies.find((fav) => fav === movie._id)
								) {
									return (
										<div key={movie._id} md={4}>
											<Link to={`/movies/${movie._id}`}>
												<img
													className="card-img"
													src={movie.ImagePath}
													crossOrigin="anonymous"
													alt={movie.Title}
												/>
												<p className="text-white">{movie.Title}</p>
											</Link>
											<button
												className="mt-3"
												value={movie._id}
												variant="secondary"
												onClick={() => this.onRemoveFavorite(movie)}
											>
												Remove
											</button>
										</div>
									);
								}
							})}
						<div>
							<button
								style={{ float: 'left' }}
								onClick={() => {
									onBackClick(null);
								}}
							>
								Back
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
