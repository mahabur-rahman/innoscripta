import { Link } from "react-router-dom";
import { FeedCardProps } from "../interfaces/newsFeed.interface";

const FeedCard = ({ article }: FeedCardProps) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
      <img
        src={article.urlToImage || "default-image-url.jpg"}
        className="object-cover w-full h-64"
        alt={article.title}
      />
      <div className="p-5 border border-t-0">
        <p className="flex justify-between mb-3 text-xs font-semibold tracking-wide uppercase">
          <span
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="Category"
            title={article.source}
          >
            {article.source}
          </span>
          <span className="text-gray-600">
            {new Date(article.publishedAt || "").toDateString()}
          </span>
        </p>
        <div
          aria-label="Title"
          title={article.title}
          className="inline-block mb-3 text-xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          {article.title}
        </div>
        <p className="mb-2 text-gray-700">{article.description}</p>
        <p className="mb-2 text-sm italic text-gray-700">
          By: {article.author}
        </p>
        <Link
          to={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-500 transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default FeedCard;
