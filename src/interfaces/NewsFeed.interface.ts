export interface newsFeedWidgetProps {
  pageTitle: string;
  content: string;
}

export interface NewsItem {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
}

export interface ApiResponse {
  response: {
    total: number;
    results: NewsItem[];
  };
}

export interface SidebarCardProps {
  item: NewsItem;
}

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string | null;
  source: string;
  author: string;
  publishedAt: string;
}

export interface FeedCardProps {
  article: Article;
}

export interface NewsFeedWidgetProps {
  pageTitle: string;
  content: string;
}

export interface Source {
  id: string;
  name: string;
  description?: string;
  url?: string;
  category?: string;
  language?: string;
  country?: string;
}

export interface FetchSourcesResponse {
  status: string;
  sources: Source[];
}
