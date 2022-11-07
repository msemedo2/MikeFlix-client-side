import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import './director-view.scss';

export const DirectorView = ({ movies, director, onBackClick }) => {
	const { name } = useParams();
	const navigate = useNavigate();

	selectedDirector = {};

	function waitingForMovies() {
		if (!selectedDirector) {
			waitingForMovies();
		} else {
			selectedDirector = movies.find((movie) => movie.Director.Name === name);
		}
	}
	waitingForMovies();

	return (
		<div className="director-view-container">
			{!selectedDirector ? null : (
				<div>
					<h3>Director:</h3>
					<p>{selectedDirector.Director.Name}</p>
					<h3>Bio:</h3>
					<p>{selectedDirector.Director.Bio}</p>
					<h3>Death:</h3>
					<p>{selectedDirector.Director.Death}</p>
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

// DirectorView.propTypes = {
// 	director: PropTypes.shape({
// 		Name: PropTypes.string.isRequired,
// 		Bio: PropTypes.string.isRequired,
// 		Birth: PropTypes.string.isRequired,
// 		Death: PropTypes.string,
// 	}).isRequired,
// };
