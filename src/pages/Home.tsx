import { useEffect, useState } from "react";
import axios from "axios";
import NewsFeed from "../components/NewsFeed";
import SidebarCard from "../components/SidebarCard";
import { ApiResponse, NewsItem } from "../interfaces/newsFeed.interface";
import { Pagination, Skeleton } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are included

const API_ENDPOINT =
  "https://content.guardianapis.com/search?q=football&pageSize=10&page=";

const Home: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const response = await axios.get<ApiResponse>(
          `${API_ENDPOINT}${page}&api-key=c0fc8bd3-b90b-4c16-af84-91fbdf3a313a`
        );
        setNews(response.data.response.results);
        setTotalPages(Math.ceil(response.data.response.total / 10)); // Assuming pageSize is 10
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
    <div className="grid grid-cols-1 gap-4 mt-24 2xl:mt-32 md:grid-cols-12 lg:px-4">
      <div className="md:col-span-9">
        <NewsFeed />
      </div>

      <div className="p-4 md:col-span-3 xl:p-0 ">
        <div className="bottom-0 w-1/4 h-screen pb-4 overflow-y-scroll 2xl:pb-4 xl:right-0 xl:fixed top-4 ">
          <h4 className="pt-24 mb-0 text-2xl font-bold 2xl:pt-32">Breaking news</h4>
          {news.length > 0 ? (
            <>
              {news.map((item) => (
                <SidebarCard key={item.id} item={item} />
              ))}
              <Pagination
                current={currentPage}
                pageSize={10}
                total={totalPages * 10} // Total number of items (estimate)
                onChange={handlePageChange}
                showSizeChanger={false}
                align="center"
                size="small"
                className="sticky bottom-0 left-0 right-0 py-4 mt-4 bg-gray-100"
              />
            </>
          ) : (
            <>
              <Skeleton  />
              <Skeleton className="my-16" />
              <Skeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
