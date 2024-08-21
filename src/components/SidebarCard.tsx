const SidebarCard = ({item}) => {
  return (
    
      <div className="py-4 2xl:py-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-1">
        <div className="max-w-screen-lg sm:mx-auto">
          <div className="py-4">
            <div className="mb-4 lg:mb-0">
              <h5 className="mb-4 text-lg font-bold leading-none line-clamp-1">
                {item.webTitle}
              </h5>
              <div className="relative pr-8">
                <p className="text-sm text-gray-700">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </div>
            {/* <div className="">
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                Details
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </div>
  );
};

export default SidebarCard;
