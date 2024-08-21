export interface newsFeedWidgetProps {
    pageTitle: string;
    content: string;
  }
  

  export interface NewsItem {
    id: string;
    webTitle: string;
    webUrl: string;
  }
  
  export interface ApiResponse {
    response: {
      results: NewsItem[];
    };
  }