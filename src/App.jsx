import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingsPage from "./pages/BookingsPage";
import ProfilePage from "./pages/ProfilePage";
import FavouritesPage from "./pages/FavouritesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CarDetailPage from "./pages/CarDetailPage";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
    return (
        <FavoritesProvider>
            <Routes>
                {/* Login und Registrierung sind frei zugänglich */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Alle anderen Seiten sind geschützt */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Homepage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <CategoriesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <BookingsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <FavouritesPage />
                        </ProtectedRoute>
                    }
                />
                {/* Detailseiten für Kategorie und Fahrzeuge */}
                <Route
                    path="/kategorie/:slug"
                    element={
                        <ProtectedRoute>
                            <CategoryDetailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/auto/:slug"
                    element={
                        <ProtectedRoute>
                            <CarDetailPage />
                        </ProtectedRoute>
                    }
                />
                {/* Fallback für unbekannte Seiten */}
                <Route path="*" element={<div>Seite nicht gefunden</div>} />
            </Routes>
        </FavoritesProvider>
    );
}