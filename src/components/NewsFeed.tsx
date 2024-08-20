import FeedCard from "./FeedCard";
import NewsFeedWidget from "./NewsFeetTitle";

const NewsFeed = () => {
  return (
    <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <NewsFeedWidget
          pageTitle={"Latest News"}
          content={
            "Stay informed with the latest positive news from around the world."
          }
        />
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
