import { SidebarCardProps } from "../interfaces/newsFeed.interface";

const SidebarCard = ({ item }: SidebarCardProps) => {
  const formattedDate = new Date(item.webPublicationDate).toLocaleDateString();

  return (
    <div className="py-4 2xl:py-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-1">
      <div className="max-w-screen-lg sm:mx-auto">
        <div className="py-4">
          <div className="mb-4 lg:mb-0">
            <h5 className="mb-4 text-lg font-bold leading-none line-clamp-1">
              {item.webTitle.length > 15
                ? `${item?.webTitle.slice(0, 15)}...`
                : item.webTitle}
            </h5>
            <div className="relative pr-8">
              <p className="mb-2 text-sm text-gray-700">{item.webTitle}</p>
              <p className="mb-2 text-xs text-gray-500">Published on: {formattedDate}</p>
              <a
                href={item.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCard;
