// FavoritesContext.jsx - Verwaltung der Favoriten mit LocalStorage

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites muss innerhalb von FavoritesProvider verwendet werden');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Favoriten aus LocalStorage laden beim Start
    useEffect(() => {
        const savedFavorites = localStorage.getItem('car4you-favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Favoriten in LocalStorage speichern bei Änderungen
    useEffect(() => {
        localStorage.setItem('car4you-favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Fahrzeug zu Favoriten hinzufügen
    const addFavorite = (vehicleSlug) => {
        if (!favorites.includes(vehicleSlug)) {
            setFavorites([...favorites, vehicleSlug]);
        }
    };

    // Fahrzeug aus Favoriten entfernen
    const removeFavorite = (vehicleSlug) => {
        setFavorites(favorites.filter(slug => slug !== vehicleSlug));
    };

    // Prüfen ob Fahrzeug favorisiert ist
    const isFavorite = (vehicleSlug) => {
        return favorites.includes(vehicleSlug);
    };

    // Favorit togglen (hinzufügen oder entfernen)
    const toggleFavorite = (vehicleSlug) => {
        if (isFavorite(vehicleSlug)) {
            removeFavorite(vehicleSlug);
        } else {
            addFavorite(vehicleSlug);
        }
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};