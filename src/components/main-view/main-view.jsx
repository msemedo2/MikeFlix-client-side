import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar } from '../navbar/navbar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import MoviesList from '../movies-list/movies-list';

import './main-view.scss';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
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
				this.props.setMovies(response.data);
			})

			.catch((error) => {
				console.log(error);
			});
	}

	onLoggedIn(authData) {
		this.setState({
			user: authData.user.Username,
		});

		this.setState({ loggedIn: true });

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	render() {
		const { user, loggedIn } = this.state;
		let { movies } = this.props;

		return (
			<Router>
				<Navbar user={user} />
				<Routes>
					<Route
						exact
						path="/"
						element={
							loggedIn ? (
								<MoviesList movies={movies} />
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

let mapStateToProps = (state) => {
	return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
