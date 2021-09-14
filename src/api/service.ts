import axios from "axios";
import { makeQueryStringFromObject } from "utils/makeQueryStringFromObject";
import { ICreateGistArgs, IPublicGistsQueryParams, IUpdateArgs } from "./types";

class Service {
  baseUrl: string;
  constructor() {
    this.baseUrl = "https://api.github.com/gists";
    axios.defaults.headers.common[
      "Authorization"
    ] = `token ${process.env.REACT_APP_AUTH_TOKEN}`;
    axios.defaults.headers.common["Accept"] = "application/vnd.github.v3+json";
  }

  getGists = async () => {
    const res = await axios.get(this.baseUrl);
    return res.data;
  };

  getGist = async (gistId: string) => {
    const res = await axios.get(`${this.baseUrl}/${gistId}`);
    return res.data;
  };

  getPublicGists = async (queryObject: IPublicGistsQueryParams) => {
    const res = await axios.get(
      `${this.baseUrl}/public${makeQueryStringFromObject(queryObject)}`
    );
    return res.data;
  };

  createGist = async ({
    files,
    description,
    isPublic = false,
  }: ICreateGistArgs) => {
    const res = await axios.post(this.baseUrl, {
      ...(description && { description }),
      public: isPublic,
      files,
    });
    return res.data;
  };

  updateGist = async ({ gistId, files, description }: IUpdateArgs) => {
    const res = await axios.patch(`${this.baseUrl}/${gistId}`, {
      ...(description && { description }),
      files,
    });
    return res.data;
  };

  deleteGist = async (gistId: string) => {
    await axios.delete(`${this.baseUrl}/${gistId}`);
  };
}

const service = new Service();
export default service;
