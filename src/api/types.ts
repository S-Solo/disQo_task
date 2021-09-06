export interface ICreateGistArgs {
  fileName: string;
  content: string;
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
  fileName: string;
  content: string;
  description?: string;
}
