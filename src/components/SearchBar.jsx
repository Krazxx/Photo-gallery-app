import { memo } from "react";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by author name..."
      className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  );
}

export default memo(SearchBar);
