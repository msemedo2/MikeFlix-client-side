import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss';

export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;

		return (
			<div className="movie-card-view-container">
				<div
					className="movie-card-view-poster"
					onClick={() => {
						onMovieClick(movie);
					}}
				>
					<img
						className="movie-card-view-image"
						src={movie.ImagePath}
						crossorigin="anonymous"
					/>
					<div className="movie-card-view-title-container">
						<h2 className="movie-card-view-title">{movie.Title}</h2>
					</div>
				</div>
			</div>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
