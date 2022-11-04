import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
		};
	}

	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}
	render() {
		const { movies, selectedMovie } = this.state;

		if (movies.length === 0)
			return <div className="main-view">The list is empty!</div>;

		return (
			<div className="main-view">
				{selectedMovie ? (
					<MovieView
						movie={selectedMovie}
						onBackClick={(newSelectedMovie) => {
							this.setSelectedMovie(newSelectedMovie);
						}}
					/>
				) : (
					movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movie={movie}
							onMovieClick={(movie) => {
								this.setSelectedMovie(movie);
							}}
						/>
					))
				)}
			</div>
		);
	}
}
