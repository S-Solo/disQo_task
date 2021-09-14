export interface FilesType {
  [key: string]: {
    content: string;
  };
}

export interface ICreateGistArgs {
  files: FilesType;
  description?: string;
  isPublic?: boolean;
}

export interface IPublicGistsQueryParams {
  since?: string;
  per_page?: number;
  page?: number;
}

export interface IUpdateArgs {
  gistId: string;
  files: FilesType;
  description?: string;
}

export interface IPublicGist {
  comments: number;
  comments_url: string;
  commits_url: string;
  created_at: string;
  description: string;
  files: { [key: string]: any };
  forks_url: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  id: string;
  node_id: string;
  owner: any;
  public: true;
  truncated: false;
  updated_at: "2021-09-08T22:14:50Z";
  url: string;
  user: null;
}
