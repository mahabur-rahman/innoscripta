import React, { useEffect, useState } from "react";
import { Button, Checkbox, List } from "antd";
import NewsFeedWidget from "../common/NewsFeedWidget";
import { Helmet } from "react-helmet";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleAuthor, toggleSource, toggleCategory } from "../store/preferencesSlice";

const Preferences: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAuthors = useSelector((state: RootState) => state.preferences.selectedAuthors);
  const selectedSources = useSelector((state: RootState) => state.preferences.selectedSources);
  const selectedCategories = useSelector((state: RootState) => state.preferences.selectedCategories);

  const [authors, setAuthors] = useState<string[]>([]);
  const [sources, setSources] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines/sources?apiKey=d120bb75f00b4b088ffedfcc5bb4b1ad"
        );
        const data = await response.json();
        const fetchedSources = data.sources.map((source: any) => ({
          id: source.id,
          name: source.name,
          category: source.category,
        }));

        const uniqueCategories = [
          ...new Set(fetchedSources.map((source: any) => source.category)),
        ];

        setSources(fetchedSources);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=news&apiKey=d120bb75f00b4b088ffedfcc5bb4b1ad"
        );
        const data = await response.json();
        const fetchedAuthors = [
          ...new Set(data.articles.map((article: any) => article.author).filter(Boolean)),
        ];

        setAuthors(fetchedAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchSources();
    fetchAuthors();
  }, []);

  const handleAuthorChange = (author: string) => {
    dispatch(toggleAuthor(author));
  };

  const handleSourceChange = (sourceId: string) => {
    dispatch(toggleSource(sourceId));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category));
  };

  return (
    <>
      <Helmet>
        <title>Customize News Preferences...</title>
      </Helmet>
      <div className="container p-4 mx-auto mt-24">
        <NewsFeedWidget
          pageTitle={"Preferences"}
          content={"Modify your settings to enhance and personalize your experience here."}
        />
        <Button type="primary" icon={<SaveOutlined />} className="float-right">
          Save Changes
        </Button>
        <div className="grid w-full grid-cols-3 gap-4 mt-4">
          <div>
            <h3 className="text-lg font-semibold">Authors</h3>
            <p className="text-gray-500">{authors.length} authors</p>
            <List
              className="mt-4"
              bordered
              dataSource={authors.filter(Boolean)} 
              renderItem={(author) => (
                <List.Item key={author}>
                  <Checkbox
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                  >
                    {author}
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
              renderItem={(source) => (
                <List.Item key={source.id}>
                  <Checkbox
                    checked={selectedSources.includes(source.id)}
                    onChange={() => handleSourceChange(source.id)}
                  >
                    {source.name}
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Categories</h3>
            <p className="text-gray-500">{categories.length} categories</p>
            <List
              bordered
              dataSource={categories}
              className="mt-4"
              renderItem={(category) => (
                <List.Item key={category}>
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  >
                    {category}
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
