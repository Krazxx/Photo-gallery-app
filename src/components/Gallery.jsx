import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
} from "../reducers/favouritesReducer.js";
import SearchBar from "./SearchBar.jsx";
import PhotoCard from "./PhotoCard.jsx";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites
  );

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // useCallback: keeps the same function between renders so the
  // memoised SearchBar does not re-render for no reason
  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: id });
  }, []);

  // useMemo: only re-filter when photos or query change
  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, query]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-100 p-4 text-center text-red-700">
        Failed to load photos: {error}
      </p>
    );
  }

  return (
    <>
      <SearchBar value={query} onChange={handleSearch} />

      {filteredPhotos.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No photos found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </>
  );
}
