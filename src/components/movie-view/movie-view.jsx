import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './movie-view.scss';

export const MovieView = ({ user, movies }) => {
	const { movieId } = useParams();
	const navigate = useNavigate();

	let selectedMovie = {};

	function waitingForMovies() {
		if (!selectedMovie) {
			waitingForMovies();
		} else {
			selectedMovie = movies.find((movie) => movie._id === movieId);
		}
	}
	waitingForMovies();

	function addToFavs(movies, user) {
		let username = localStorage.getItem('user');
		let token = localStorage.getItem('token');
		console.log(movies);
		console.log(token);
		selectedMovie = movies.find((movie) => movie._id === movieId);

		axios
			.post(
				`https://mikeflix2.herokuapp.com/users/${username}/movies/${selectedMovie._id}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				console.log(response.data);
				alert(`${selectedMovie.Title} has been added from your list.`);
			})
			.catch(function (err) {
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			});
	}

	return (
		<div>
			{!selectedMovie ? null : (
				<div className="movie-view-container">
					<div className="movie-view-poster">
						<img
							className="movie-view-image"
							src={selectedMovie.ImagePath}
							crossOrigin="anonymous"
						/>
						<div className="movie-view-info-container">
							<div className="movie-view-title">
								<span className="label"></span>
								<span className="value">{selectedMovie.Title}</span>
							</div>
							<div className="movie-view-description">
								<span className="label"></span>
								<span className="value">{selectedMovie.Description}</span>
							</div>
							<div className="movie-view-info-buttons-container">
								<div className="movie-view-info-buttons">
									<Link to={`/directors/${selectedMovie.Director.Name}`}>
										<button className="movie-view-btn">Director</button>
									</Link>
									<Link to={`/genres/${selectedMovie.Genre.Name}`}>
										<button className="movie-view-btn">Genre</button>
									</Link>

									<button
										className="movie-view-btn"
										onClick={() => {
											addToFavs(movies, user);
										}}
									>
										Add to favorites
									</button>
								</div>
								<button
									className="movie-view-back-button"
									onClick={() => {
										navigate(-1);
									}}
								>
									Back
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
