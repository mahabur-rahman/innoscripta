import React, { useState, useEffect } from "react";
import { Input, Select, DatePicker, message } from "antd";
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
  onSourceChange: (source: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSourceChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sources, setSources] = useState<SelectProps["options"]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines/sources?apiKey=de883712d0524b6498d08cbd5a16ee52"
        );
        const data = await response.json();

        if (data.status === "ok") {
          const sourceOptions = data.sources.map((source: any) => ({
            value: source.id,
            label: source.name,
          }));
          setSources(sourceOptions);
        } else {
          message.error("Failed to fetch sources");
        }
      } catch (error) {
        message.error("An error occurred while fetching sources");
      }
    };

    fetchSources();
  }, []);

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

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
    onSourceChange(value); // Notify the parent component about the selected source
  };
  

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
          // mode="tags"
          className="w-full"
          tokenSeparators={[","]}
          options={sources} // Apply the fetched sources here
          placeholder="Select sources..."
          onChange={handleSourceChange}
        />

        <RangePicker className="w-full" />
      </div>
    </>
  );
};

export default SearchBar;
