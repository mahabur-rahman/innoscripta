import { socialLinks } from "../data/data";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="px-4 pt-16 mx-auto text-center sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex flex-col justify-between py-5 border-t sm:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright {year} & All rights reserved.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4 sm:mt-0">
          {socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
