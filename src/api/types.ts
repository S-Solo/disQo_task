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
