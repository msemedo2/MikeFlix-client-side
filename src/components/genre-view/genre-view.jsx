import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import './genre-view.scss';

export const GenreView = ({ movies }) => {
	const { name } = useParams();
	const navigate = useNavigate();

	selectedGenre = {};

	function waitingForMovies() {
		if (!selectedGenre) {
			waitingForMovies();
		} else {
			selectedGenre = movies.find((movie) => movie.Genre.Name === name);
		}
	}
	waitingForMovies();

	return (
		<div className="genre-view-container">
			{!selectedGenre ? null : (
				<div className="genre-container">
					<div className="genre">
						<h3>Genre</h3>
						<p>{selectedGenre.Genre.Name}</p>
					</div>
					<div className="description">
						<h3>Description</h3>
						<p>{selectedGenre.Genre.Description}</p>
					</div>
					<button
						className="genre-view-button"
						onClick={() => {
							navigate(-1);
						}}
					>
						Back
					</button>
				</div>
			)}
		</div>
	);
};
