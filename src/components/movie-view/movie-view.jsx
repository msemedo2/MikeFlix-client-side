import React from 'react';

import './movie-view.scss';

export class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className="movie-view-container">
				<div className="movie-view-poster">
					<img
						className="movie-view-image"
						src={movie.ImagePath}
						crossorigin="anonymous"
					/>
					<div className="movie-view-info-container">
						<div className="movie-view-title">
							<span className="label"></span>
							<span className="value">{movie.Title}</span>
						</div>
						<div className="movie-view-description">
							<span className="label"></span>
							<span className="value">{movie.Description}</span>
						</div>
						<button
							className="movie-view-button"
							onClick={() => {
								onBackClick(null);
							}}
						>
							Back
						</button>
					</div>
				</div>
			</div>
		);
	}
}
