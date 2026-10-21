export const STORAGE_KEY = "photo-gallery-favourites";

// Reads saved favourites (array of photo ids) from localStorage
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Actions: TOGGLE_FAVOURITE (payload = photo id)
export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
}
