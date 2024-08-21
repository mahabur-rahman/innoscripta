import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import FeedCard from "./FeedCard";
import NewsFeedWidget from "../common/NewsFeedWidget";
import SearchBar from "./Search";
import { Article } from "../interfaces/newsFeed.interface";
import InfiniteScroll from "react-infinite-scroll-component";

const NEWS_API_KEY = "de883712d0524b6498d08cbd5a16ee52";
const NEWS_BASE_URL = "https://newsapi.org/v2/everything";
const NYT_API_URL = "https://api.nytimes.com/svc/topstories/v2/world.json";
const NYT_API_KEY = "0XQveFRbsEVehGpaTz5ERNkmQLKfAd2q";

const normalizeArticle = (article: any, source: string): Article => {
  return {
    title: article.title,
    description:
      article.description || article.abstract || "No description available",
    url: article.url,
    urlToImage: article.urlToImage || article.multimedia?.[0]?.url || null,
    source: source,
    author: article.author || article.byline || "Unknown",
    publishedAt: article.publishedAt || article.created_date || "N/A",
  };
};

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");

  const fetchArticles = async (
    pageNumber: number,
    query: string,
    source: string
  ) => {
    try {
      let response: AxiosResponse;
      let newArticles: Article[] = [];

      if (source) {
        // Fetch articles from the selected source
        response = await axios.get(NEWS_BASE_URL, {
          params: {
            q: query || 'general',
            apiKey: NEWS_API_KEY,
            page: pageNumber,
            pageSize: 10,
            sources: source, // Apply the selected source
          },
        });
        const newsArticles = response.data.articles;
        newArticles = newsArticles.map((article: any) =>
          normalizeArticle(article, "NewsAPI")
        );
      } else if (query === "") {
        // Fetch from both APIs if the query is empty
        const [nytResponse, newsResponse] = await Promise.all([
          axios.get(NYT_API_URL, { params: { "api-key": NYT_API_KEY } }),
          axios.get(NEWS_BASE_URL, {
            params: {
              q:  "news",
              apiKey: NEWS_API_KEY,
              page: pageNumber,
              pageSize: 10,
            },
          }),
        ]);

        const nytArticles = nytResponse.data.results;
        const newsArticles = newsResponse.data.articles;

        newArticles = [
          ...nytArticles.map((article: any) =>
            normalizeArticle(article, "New York Times")
          ),
          ...newsArticles.map((article: any) =>
            normalizeArticle(article, "NewsAPI")
          ),
        ];
      } else {
        // Fetch from NewsAPI only if query is not empty
        response = await axios.get(NEWS_BASE_URL, {
          params: {
            q: query,
            apiKey: NEWS_API_KEY,
            page: pageNumber,
            pageSize: 10,
          },
        });
        const newsArticles = response.data.articles;
        newArticles = newsArticles.map((article: any) =>
          normalizeArticle(article, "NewsAPI")
        );
      }

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setHasMore(
        newArticles.length > 0 && articles.length + newArticles.length <= 200
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles(page, searchQuery, selectedSource);
  }, [page, searchQuery, selectedSource]);

  useEffect(() => {
    // Trigger API call when searchQuery is cleared
    if (searchQuery.length === 0) {
      setPage(1); // Reset page number
      setArticles([]); // Clear existing articles
      fetchArticles(1, "", selectedSource); // Fetch from both APIs
    }
  }, [searchQuery]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset page number when new search is performed
    setArticles([]); // Clear existing articles
  };

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    setPage(1); // Reset page number
    setArticles([]); // Clear existing articles
    fetchArticles(1, searchQuery, source); // Fetch articles with new source
  };

  return (
    <div className="px-4 py-4 mx-auto 2xl:py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <h1>{articles?.length}</h1>
      <NewsFeedWidget
        pageTitle={"Latest News"}
        content={
          "Stay informed with the latest positive news from around the world."
        }
      />

      <SearchBar onSearch={handleSearch} onSourceChange={handleSourceChange} />

      <InfiniteScroll
        dataLength={articles.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more articles to display</p>}
      >
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {articles.map((article) => (
            <FeedCard key={article.url} article={article} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;
