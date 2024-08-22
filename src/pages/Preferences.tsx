import React, { useState } from "react";
import { Button, Checkbox, List } from "antd";
import NewsFeedWidget from "../common/NewsFeedWidget";
import { Helmet } from "react-helmet";
import {
  SaveOutlined
} from '@ant-design/icons';

interface Author {
  name: string;
  checked: boolean;
}

interface Source {
  name: string;
  checked: boolean;
}

const Preferences: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([
    { name: "Adam Samson", checked: false },
    { name: "Eve Carter", checked: false },
    { name: "John Doe", checked: false },
    { name: "Jane Smith", checked: false },
    { name: "Michael Johnson", checked: false },
    { name: "Emily Davis", checked: false },
    { name: "Chris Lee", checked: false },
    { name: "Alex Brown", checked: false },
    { name: "Sarah Wilson", checked: false },
    { name: "David Martinez", checked: false },
    { name: "David Martinez", checked: false },
    { name: "David Martinez", checked: false },
    // Add more authors as needed
  ]);

  const [sources, setSources] = useState<Source[]>([
    { name: "247Sports", checked: false },
    { name: "ESPN", checked: false },
    { name: "Bleacher Report", checked: false },
    { name: "Yahoo Sports", checked: false },
    { name: "CBS Sports", checked: false },
    { name: "NBC Sports", checked: false },
    { name: "The Athletic", checked: false },
    { name: "Sports Illustrated", checked: false },
    { name: "Fox Sports", checked: false },
    { name: "USA Today", checked: false },
    { name: "USA Today", checked: false },
    { name: "USA Today", checked: false },
    { name: "USA Today", checked: false },
    { name: "USA Today", checked: false },
    // Add more sources as needed
  ]);

  const handleAuthorChange = (index: number, checked: boolean) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index].checked = checked;
    setAuthors(updatedAuthors);
  };

  const handleSourceChange = (index: number, checked: boolean) => {
    const updatedSources = [...sources];
    updatedSources[index].checked = checked;
    setSources(updatedSources);
  };

  return (
    <>
      <Helmet>
        <title>Customize News Preferences...</title>
      </Helmet>
      <div className="container p-4 mx-auto mt-24">
        <NewsFeedWidget
          pageTitle={"Preferences"}
          content={
            "Modify your settings to enhance and personalize your experience here."
          }
        />
         <Button type="primary" icon={<SaveOutlined /> } className="float-right">
            Save Changes
          </Button>
        <div className="grid w-full grid-cols-3 gap-4 mt-4">
          <div>
            <h3 className="text-lg font-semibold">Authors</h3>
            <p className="text-gray-500">{authors.length} authors</p>
            <List
              className="mt-4"
              bordered
              dataSource={authors}
              renderItem={(item, index) => (
                <List.Item>
                  <Checkbox
                    checked={item.checked}
                    onChange={(e) =>
                      handleAuthorChange(index, e.target.checked)
                    }
                  >
                    {item.name}
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Sources</h3>

            <p className="text-gray-500">{sources.length} sources</p>
            <List
              bordered
              dataSource={sources}
              className="mt-4"
              renderItem={(item, index) => (
                <List.Item>
                  <Checkbox
                    checked={item.checked}
                    onChange={(e) =>
                      handleSourceChange(index, e.target.checked)
                    }
                  >
                    {item.name}
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Categories</h3>
            <p className="text-gray-500">{sources.length} sources</p>
            <List
              bordered
              dataSource={sources}
              className="mt-4"
              renderItem={(item, index) => (
                <List.Item>
                  <Checkbox
                    checked={item.checked}
                    onChange={(e) =>
                      handleSourceChange(index, e.target.checked)
                    }
                  >
                    {item.name}
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Preferences;
