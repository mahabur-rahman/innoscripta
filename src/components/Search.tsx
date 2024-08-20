import { Input, Select, DatePicker } from "antd";
import type { SelectProps } from "antd";

const { RangePicker } = DatePicker;

const SearchBar = () => {
  const options: SelectProps["options"] = Array.from({ length: 26 }, (_, i) => {
    const value = (i + 10).toString(36) + (i + 10);
    return { value, label: value };
  });

  return (
    <>
      <div className="mb-2 text-red-500 text-end">
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
    </>
  );
};

export default SearchBar;
