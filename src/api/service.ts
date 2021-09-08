import axios from "axios";
import { makeQueryStringFromObject } from "utils/makeQueryStringFromObject";
import { ICreateGistArgs, IPublicGistsQueryParams, IUpdateArgs } from "./types";

class Service {
  baseUrl: string;
  constructor() {
    this.baseUrl = "https://api.github.com/gists";
    axios.defaults.headers.common["Authorization"] =
      "token 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";
    axios.defaults.headers.common["Accept"] = "application/vnd.github.v3+json";
  }

  getGists = async () => {
    const res = await axios.get(this.baseUrl);
    return res.data;
    // service.getGists()
  };

  getGist = async (gistId: string) => {
    const res = await axios.get(`${this.baseUrl}/${gistId}`);
    return res.data;
    // service.getGists()
  };

  getPublicGists = async (queryObject: IPublicGistsQueryParams) => {
    const res = await axios.get(
      `${this.baseUrl}/public${makeQueryStringFromObject(queryObject)}`
    );
    return res.data;
    // service.getPublicGists({
    //   since: getFiveSecondsEarlierDate(),
    //   page: 1,
    //   per_page: GISTS_PER_PAGE,
    // });
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
    // service.createGist(state.noteName, state.noteContent);
  };

  updateGist = async ({ gistId, files, description }: IUpdateArgs) => {
    const res = await axios.patch(`${this.baseUrl}/${gistId}`, {
      ...(description && { description }),
      files,
    });
    return res.data;
    // service.updateGist({
    //   gistId: gist.id,
    //   description: "Something",
    //   files: { [fileName]: { content: fileContent } },
    // });
  };

  deleteGist = async (gistId: string) => {
    await axios.delete(`${this.baseUrl}/${gistId}`);
    // service.deleteGist(gist.id);
  };
}

const service = new Service();
export default service;
