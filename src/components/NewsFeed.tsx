import { useState, useEffect } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";
import NewsFeedWidget from "../common/NewsFeedWidget";
import SearchBar from "./Search";

const NEWS_API_KEY = "65062e2270024cd5a94980583ac3ae30";
const NEWS_BASE_URL = "https://newsapi.org/v2/everything";
const NYT_API_URL = "https://api.nytimes.com/svc/topstories/v2/world.json";
const NYT_API_KEY = "0XQveFRbsEVehGpaTz5ERNkmQLKfAd2q";

// Function to normalize article data
const normalizeArticle = (article, source) => {
  return {
    title: article.title,
    description: article.description || article.abstract,
    url: article.url,
    urlToImage: article.urlToImage || article.multimedia?.[0]?.url || null,
    source: source,
    author: article.author || article.byline || "Unknown",
    publishedAt: article.publishedAt || article.created_date || "N/A",
  };
};

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNumber) => {
    setLoading(true);
    try {
      let response;
      let newArticles = [];

      if (articles.length > 99) {
        // Fetch from New York Times API
        response = await axios.get(NYT_API_URL, {
          params: { "api-key": NYT_API_KEY },
        });
        newArticles = response.data.results.map((article) =>
          normalizeArticle(article, "New York Times")
        );
      } else {
        // Fetch from NewsAPI
        response = await axios.get(NEWS_BASE_URL, {
          params: {
            q: "news",
            apiKey: NEWS_API_KEY,
            page: pageNumber,
            pageSize: 10,
          },
        });
        newArticles = response.data.articles.map((article) =>
          normalizeArticle(article, "NewsAPI")
        );
      }

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setHasMore(
        newArticles.length > 0 && articles.length + newArticles.length <= 200
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="px-4 py-4 mx-auto 2xl:py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      {/* <h1>{articles.length}</h1> */}
      <NewsFeedWidget
        pageTitle={"Latest News"}
        content={
          "Stay informed with the latest positive news from around the world."
        }
      />

      {/* search bar */}
      <SearchBar />

      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {articles.map((article, index) => (
          <FeedCard key={index} article={article} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button
          onClick={loadMore}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default NewsFeed;
