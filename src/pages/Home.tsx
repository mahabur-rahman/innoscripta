import { useEffect, useState } from "react";
import axios from "axios";
import NewsFeed from "../components/NewsFeed";
import SidebarCard from "../components/SidebarCard";
import { ApiResponse, NewsItem } from "../interfaces/newsFeed.interface";
import { Pagination, Skeleton, Alert } from "antd";
import { Helmet } from "react-helmet";

const API_ENDPOINT =
  `${import.meta.env.VITE_GUARDIAN_API_URL}/search?q=football&pageSize=10&page=`;

const Home = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const response = await axios.get<ApiResponse>(
          `${API_ENDPOINT}${page}&api-key=${
            import.meta.env.VITE_GUARDIAN_API_KEY
          }`
        );
        setNews(response.data.response?.results);
        setTotalPages(Math.ceil(response?.data?.response?.total / 10));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message || "An unexpected error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Latest News - Breaking News, Sports, Business..</title>
      </Helmet>
      <div className="grid grid-cols-1 gap-4 px-4 mt-24 2xl:mt-32 md:grid-cols-12">
        <div className="col-span-12 xl:col-span-9">
          <NewsFeed />
        </div>

        <div className="col-span-12 p-4 xl:col-span-3">
          <div className="bottom-0 w-full h-screen pb-4 overflow-y-scroll xl:w-1/4 2xl:pb-4 xl:right-0 xl:fixed top-4">
            <h4 className="pt-24 mb-0 text-2xl font-bold text-red-400 capitalize 2xl:pt-32">
              Breaking news
            </h4>
            {error ? (
              <Alert
                description={error}
                type="error"
                showIcon
                className="my-4"
              />
            ) : news.length > 0 ? (
              <>
                {news.map((item) => (
                  <SidebarCard key={item.id} item={item} />
                ))}
                <Pagination
                  current={currentPage}
                  pageSize={10}
                  total={totalPages * 10}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  align="center"
                  size="small"
                  className="sticky bottom-0 left-0 right-0 py-4 mt-4 bg-gray-100"
                />
              </>
            ) : (
              <>
                <Skeleton className="mt-8" />
                <Skeleton className="my-16" />
                <Skeleton />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
