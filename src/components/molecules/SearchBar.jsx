import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import AppIcon from "@/components/atoms/AppIcon";
const SearchBar = ({ onSearch, placeholder = "Search by location, city, or property type...", className = '' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`flex gap-2 ${className}`}
    >
      <div className="flex-1 relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
          className="pr-10"
        />
        {query && (
          <button
            type="button"
onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <AppIcon name="X" size={16} />
        </button>
      )}
    </div>
      <Button type="submit" variant="primary" icon="Search">
        Search
      </Button>
    </motion.form>
  );
};

export default SearchBar;