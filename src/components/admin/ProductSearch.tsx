'use client';

import { useState } from "react";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";

type ProductSearchProps = {
  onSearch: (query: string) => void;
  onClear?: () => void;
  onFilter?: () => void;
  initialValue?: string;
};

export default function ProductSearch({ 
  onSearch, 
  onClear, 
  onFilter,
  initialValue = '' 
}: ProductSearchProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) onClear();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute left-3 top-3.5 text-gray-400">
          <FiSearch className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-10 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-3 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
        <div className="absolute right-0 top-0 flex">
          {onFilter && (
            <button
              type="button"
              onClick={onFilter}
              className="px-4 py-3 text-gray-600 hover:text-blue-600 flex items-center gap-1"
              aria-label="Filtrar"
            >
              <FiFilter className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
          >
            <FiSearch className="h-5 w-5" />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </div>
      </form>
    </div>
  );
}