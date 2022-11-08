import React from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !== '') {
		filteredMovies = movies.filter((movie) =>
			movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
		);
	}

	if (!movies) return <div className="main-view" />;

	return (
		<>
			<VisibilityFilterInput visibilityFilter={visibilityFilter} />
			{filteredMovies.map((movie, i) => (
				<MovieCard key={i} movies={movie} />
			))}
		</>
	);
}

export default connect(mapStateToProps)(MoviesList);
