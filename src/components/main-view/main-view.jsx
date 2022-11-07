import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar } from '../navbar/navbar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null,
			loggedIn: false,
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({ user: localStorage.getItem('user') });
			this.getMovies(accessToken);
			this.setState({ loggedIn: true });
		}
	}

	getMovies(token) {
		axios
			.get('https://mikeflix2.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})

			.catch((error) => {
				console.log(error);
			});
	}

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		this.setState({ loggedIn: true });

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	render() {
		const { movies, user, loggedIn } = this.state;

		return (
			<Router>
				<Navbar user={user} />
				<Routes>
					<Route
						exact
						path="/"
						element={
							loggedIn ? (
								<MovieCard movies={movies} />
							) : (
								<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
							)
						}
					/>
					<Route exact path="/register" element={<RegistrationView />} />
					<Route
						path="/movies/:movieId"
						element={<MovieView movies={movies} />}
					/>
					<Route
						path="/directors/:name"
						element={<DirectorView movies={movies} />}
					/>
					<Route path="/genres/:name" element={<GenreView movies={movies} />} />
					<Route
						path={`/users/${user}`}
						element={<ProfileView movies={movies} user={user} />}
					/>
				</Routes>
			</Router>
		);
	}
}

// MovieCard.propTypes = {
// 	movie: PropTypes.shape({
// 		Title: PropTypes.string.isRequired,
// 		Description: PropTypes.string.isRequired,
// 		ImagePath: PropTypes.string.isRequired,
// 		Director: PropTypes.shape({
// 			Name: PropTypes.string.isRequired,
// 			Bio: PropTypes.string.isRequired,
// 			Death: PropTypes.string,
// 		}),
// 		Genre: PropTypes.shape({
// 			Name: PropTypes.string.isRequired,
// 			Description: PropTypes.string.isRequired,
// 		}),
// 	}).isRequired,
// };
