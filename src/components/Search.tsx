import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Input, Select, DatePicker, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import { newsApiCategories } from "../data/data";
import { FetchSourcesResponse, Source } from "../interfaces/newsFeed.interface";
import { Moment } from "moment";
import { RangePickerProps } from "antd/es/date-picker";
const { RangePicker } = DatePicker;

interface SearchBarProps {
  onSearch: (
    query: string,
    dateRange?: [Moment, Moment],
    category?: string
  ) => void;
  onSourceChange: (source: string) => void;
}

const SearchBar = ({ onSearch, onSourceChange }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sources, setSources] = useState<SelectProps["options"]>([]);
  const [dateRange, setDateRange] = useState<[Moment, Moment] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NEW_API_HEADLINE_URL}/sources?apiKey=${
            import.meta.env.VITE_NEWS_API_KEY
          }`
        );
        const data: FetchSourcesResponse = await response.json();

        if (data.status === "ok") {
          const sourceOptions = data.sources.map((source: Source) => ({
            value: source.id,
            label: source.name,
          }));
          setSources(sourceOptions);
        } else {
          message.error("Failed to fetch sources");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSources();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(
      searchQuery,
      dateRange ?? undefined,
      selectedCategory ?? undefined
    );
    setSearchQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSourceChange = (value: string) => {
    onSourceChange(value);
  };

  const handleDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    setDateRange(dates as [Moment, Moment] | null);
    onSearch(
      searchQuery,
      dates as [Moment, Moment] | undefined,
      selectedCategory ?? undefined
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSearch(searchQuery, dateRange ?? undefined, category);
  };

  return (
    <>
      <div className="mb-2 text-red-500 text-end">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {newsApiCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.item)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              <span className="capitalize">{category.item}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
        <Input
          placeholder="Search news.."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="w-full h-12"
          suffix={
            <SearchOutlined
              onClick={handleSearchClick}
              style={{ cursor: "pointer" }}
              className="p-2 text-gray-200 bg-blue-500 rounded"
            />
          }
        />
        <Select
          className="w-full h-12"
          options={sources}
          placeholder="Select sources..."
          onChange={handleSourceChange}
        />

        <RangePicker className="w-full h-12" onChange={handleDateRangeChange} />
      </div>
    </>
  );
};

export default SearchBar;
