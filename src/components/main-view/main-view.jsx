import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [
				{
					_id: 1,
					Title: 'The Lord of the Rings: The Fellowship of the Ring',
					Description:
						'A meek Hobbit from the land of the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
					ImagePath:
						'https://upload.wikimedia.org/wikipedia/pt/3/38/Lord_of_the_Rings_Fellowship_of_the_Ring.jpg',
				},
				{
					_id: 2,
					Title: 'The Lord of the Rings: The Two Towers',
					Description:
						'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Saurons new ally, Saruman, and his hordes of Isengard.',
					ImagePath:
						'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
				},
				{
					_id: 3,
					Title: 'The Lord of the Rings: The Return of the King',
					Description:
						'Gandalf and Aragorn lead the World of Men against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
					ImagePath:
						'https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg',
				},
			],
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
