import { Input, Select, DatePicker } from "antd";
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

const SearchBar = () => {
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
        <Input placeholder="Search news.." allowClear className="w-full" />
        <Select
          mode="tags"
          className="w-full"
          tokenSeparators={[","]}
          options={options}
          placeholder="Select sources..."
        />
        <RangePicker className="w-full" />
      </div>
      {/* <p className="mb-3 text-sm">Total 402 news found in this search criteria</p> */}
    </>
  );
};

export default SearchBar;
