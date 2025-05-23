import {createContext, useContext, useEffect, useState} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    // Użycie local storage z przeglądarki
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        // Parsowanie na stringa, bo LS może przechowywać tylko ciągi znaków
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    // Update LS (użycie useEffect) jeżeli kiedykolwiek zmienna favorites (z const[fav,sFav]) się zmieni
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Dodanie movie do tablicy useState z [f,setF], wszystkich dotychczasowych wartości ...prev i dodanie do nich movie
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    // wszystko poniżej jest dostępne dla {children} w MovieContext.Provider
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>;
};