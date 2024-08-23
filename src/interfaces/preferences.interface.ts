

export interface Author {
  name: string;
  checked: boolean;
}

export interface Source {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

export interface AuthorResponse {
  articles: { author: string | null }[];
}

export interface SourceResponse {
  sources: Source[];
}
