import React, { useState } from "react";
import { Input, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";

const { RangePicker } = DatePicker;

const categories = [
  "Home",
  "News",
  "Sport",
  "Business",
  "Innovation",
  "Culture",
  "Travel",
  "Earth",
  "Video",
  "Live",
];

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
    setSearchQuery(""); // Clear the input field
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const options: SelectProps["options"] = Array.from({ length: 26 }, (_, i) => {
    const value = (i + 10).toString(36) + (i + 10);
    return { value, label: value };
  });

  return (
    <>
      <div className="mb-2 text-red-500 text-end">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
        <button>Clear Filters</button>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
        <Input
          placeholder="Search news.."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="w-full"
          suffix={
            <SearchOutlined
              onClick={handleSearchClick}
              style={{ cursor: "pointer" }}
              className="p-2 text-gray-200 bg-blue-500 rounded"
            />
          }
        />
        <Select
          mode="tags"
          className="w-full"
          tokenSeparators={[","]}
          options={options}
          placeholder="Select sources..."
        />
        <RangePicker className="w-full" />
      </div>
    </>
  );
};

export default SearchBar;
