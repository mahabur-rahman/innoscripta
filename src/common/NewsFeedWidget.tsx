import { newsFeedWidgetProps } from "../interfaces/newsFeed.interface";

const NewsFeedWidget = ({ pageTitle, content }: newsFeedWidgetProps) => {
  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
        {pageTitle}
      </h2>
      <p className="mb-3 text-lg leading-relaxed text-center text-gray-700">
        {content}
      </p>
    </div>
  );
};

export default NewsFeedWidget;
