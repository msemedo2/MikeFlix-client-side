import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './movie-card.scss';
export class MovieCard extends React.Component {
	render() {
		const { movies } = this.props;

		return (
			<div>
				<div>
					<div className="movie-card-view-container">
						<Link
							to={`/movies/${movies._id}`}
							className="movie-card-view-poster"
						>
							<img
								className="movie-card-view-image"
								src={movies.ImagePath}
								crossOrigin="anonymous"
							/>
						</Link>

						<div className="movie-card-view-title-container">
							<h2 className="movie-card-view-title">{movies.Title}</h2>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
