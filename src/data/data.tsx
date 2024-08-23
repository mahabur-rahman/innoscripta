import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

export const navItems = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Preferences", url: "/preferences" },
];

export const socialLinks = [
  { id: 1, icon: <FaTwitter />, url: "https://www.twitter.com" },
  { id: 2, icon: <FaInstagram />, url: "https://www.instagram.com" },
  { id: 3, icon: <FaFacebook />, url: "https://www.facebook.com" },
];

export const newsApiCategories = [
  { id: 1, item: "business" },
  { id: 2, item: "entertainment" },
  { id: 3, item: "general" },
  { id: 4, item: "health" },
  { id: 5, item: "science" },
  { id: 6, item: "sports" },
  { id: 7, item: "technology" },
];
