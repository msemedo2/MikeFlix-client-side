import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import './director-view.scss';

export const DirectorView = ({ movies }) => {
	const { name } = useParams();
	const navigate = useNavigate();

	let selectedDirector = {};

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
					<div className="director-container">
						<h3>Director</h3>
						<p>{selectedDirector.Director.Name}</p>
					</div>
					<div className="bio-container">
						<h3>Bio</h3>
						<p>{selectedDirector.Director.Bio}</p>
					</div>
					<div className="birth-container">
						<div className="birth">
							<h3>Birth</h3>
							<p>{selectedDirector.Director.Birth}</p>
						</div>
						<div className="death">
							<h3>Death</h3>
							<p>{selectedDirector.Director.Death}</p>
						</div>
					</div>
					<button
						className="director-view-button"
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
