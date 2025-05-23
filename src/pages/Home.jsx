import MovieCard from "../components/MovieCard.jsx";

function Home() {

    const movies = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Deadpool & Wolverine", release_date: "2024"},
        {id: 3, title: "Terminator", release_date: "1999"},
        {id: 4, title: "The Matrix", release_date: "1998"},
    ];

    return <div className="home">
        <div className="movies-grid">
            {movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>;
}

export default Home;