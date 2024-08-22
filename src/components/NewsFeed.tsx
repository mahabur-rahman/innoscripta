import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import FeedCard from "./FeedCard";
import NewsFeedWidget from "../common/NewsFeedWidget";
import SearchBar from "./Search";
import { Article } from "../interfaces/newsFeed.interface";
import InfiniteScroll from "react-infinite-scroll-component";
import moment, { Moment } from "moment";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";

const NEWS_API_KEY = "d120bb75f00b4b088ffedfcc5bb4b1ad";
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
    source,
    author: article.author || article.byline || "Unknown",
    publishedAt: article.publishedAt || article.created_date || "N/A",
  };
};

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [hasPreference, setHasPreference] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Moment, Moment] | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const preferences = useSelector((state: any) => state.preferences);

  console.log('filtered items are:', filteredArticles)
  useEffect(() => {
    fetchArticles(page, searchQuery, selectedSource, dateRange, category);
    if (
      preferences.selectedAuthors.length > 0 ||
      preferences.selectedSources.length > 0 ||
      preferences.selectedCategories.length > 0
    ) {
      setHasPreference(true);
    }
  }, [page, searchQuery, selectedSource, dateRange, category, preferences]);

  useEffect(() => {
    if (hasPreference) {
      FetchApiWithPreference();
    }
  }, [hasPreference, articles, preferences]);

  const FetchApiWithPreference = async () => {
    const selectedAuthors = preferences.selectedAuthors;
    const selectedSources = preferences.selectedSources;
  
    // Filter existing articles based on selected authors
    const filteredByAuthors = articles.filter((article: Article) =>
      selectedAuthors.includes(article.author)
    );
  
    // Fetch new articles based on selected sources
    if (selectedSources.length > 0) {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=general&apiKey=${NEWS_API_KEY}&page=1&pageSize=10&sources=${selectedSources.join(",")}`
        );
  
        const sourceArticles = response.data.articles.map((article: any) =>
          normalizeArticle(article, "NewsAPI")
        );
  
        // Combine filtered articles with newly fetched source-based articles
        setFilteredArticles([...filteredByAuthors, ...sourceArticles]);
      } catch (error) {
        console.error("Error fetching articles by sources:", error);
      }
    } else {
      setFilteredArticles(filteredByAuthors);
    }
  };
  

  const fetchArticles = async (
    pageNumber: number,
    query: string,
    source: string,
    dateRange?: [Moment, Moment],
    category?: string
  ) => {
    try {
      let response: AxiosResponse;
      let newArticles: Article[] = [];

      const fromDate = dateRange ? dateRange[0].format("YYYY-MM-DD") : "";
      const toDate = dateRange ? dateRange[1].format("YYYY-MM-DD") : "";

      if (category) {
        response = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            category: category,
            apiKey: NEWS_API_KEY,
            page: pageNumber,
            pageSize: 10,
            ...(fromDate && toDate && { from: fromDate, to: toDate }),
          },
        });
        const newsArticles = response.data.articles;
        newArticles = newsArticles.map((article: any) =>
          normalizeArticle(article, "NewsAPI")
        );
      } else if (source) {
        response = await axios.get(NEWS_BASE_URL, {
          params: {
            q: query || "general",
            apiKey: NEWS_API_KEY,
            page: pageNumber,
            pageSize: 10,
            sources: source,
            ...(fromDate && toDate && { from: fromDate, to: toDate }),
          },
        });
        const newsArticles = response.data.articles;
        newArticles = newsArticles.map((article: any) =>
          normalizeArticle(article, "NewsAPI")
        );
      } else if (query === "") {
        const [nytResponse, newsResponse] = await Promise.all([
          axios.get(NYT_API_URL, { params: { "api-key": NYT_API_KEY } }),
          axios.get(NEWS_BASE_URL, {
            params: {
              q: "news",
              apiKey: NEWS_API_KEY,
              page: pageNumber,
              pageSize: 10,
              ...(fromDate && toDate && { from: fromDate, to: toDate }),
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
        response = await axios.get(NEWS_BASE_URL, {
          params: {
            q: query,
            apiKey: NEWS_API_KEY,
            page: pageNumber,
            pageSize: 10,
            ...(fromDate && toDate && { from: fromDate, to: toDate }),
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

  const handleSearch = (
    query: string,
    dateRange?: [Moment, Moment],
    category?: string
  ) => {
    setSearchQuery(query);
    setDateRange(dateRange || null);
    setCategory(category || null);
    setPage(1);
    setArticles([]);
    fetchArticles(1, query, selectedSource, dateRange, category);
  };

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    setPage(1);
    setArticles([]);
    fetchArticles(1, searchQuery, source, dateRange, category);
  };

  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // console.log('all articles:', articles)
  return (
    <>
      <NewsFeedWidget
        pageTitle={"Latest News"}
        content={
          "Stay informed with the latest positive news from around the world."
        }
      />
      <SearchBar onSearch={handleSearch} onSourceChange={handleSourceChange} />
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMoreArticles}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton className="my-12" />
            <Skeleton className="my-12" />
            <Skeleton className="my-12" />
          </div>
        }
      >
        {articles.length === 0 && !hasMore ? (
          <div className="my-8 text-center">
            <h3 className="text-red-400">No articles found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <FeedCard key={article.url} article={article} />
              ))
            ) : (
              articles.map((article) => (
                <FeedCard key={article.url} article={article} />                
              ))
            )}
          </div>     
        )}
      </InfiniteScroll>
    </>
  );
};

export default NewsFeed;
