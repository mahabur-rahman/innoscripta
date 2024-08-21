import { useEffect, useState } from "react";
import axios from "axios";
import NewsFeed from "../components/NewsFeed";
import SidebarCard from "../components/SidebarCard";
import { ApiResponse, NewsItem } from "../interfaces/newsFeed.interface";

const API_ENDPOINT =
  "https://content.guardianapis.com/search?q=football&pageSize=100&page=50&api-key=c0fc8bd3-b90b-4c16-af84-91fbdf3a313a";

const Home: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(API_ENDPOINT);
        setNews(response?.data?.response?.results);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message || "An unexpected error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="md:col-span-9">
        <NewsFeed />
      </div>

      <div className="p-4 md:col-span-3 xl:p-0">
        <div className="sticky top-4 2xl:py-16">
          <h4 className="mb-0 text-2xl font-bold">Breaking news</h4>
          {news.length > 0 ? (
            news.map((item) => <SidebarCard key={item.id} item={item} />)
          ) : (
            <p className="text-red-400">Error: {error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
