import axios from "axios";

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
  };

  createGist = async (filename: string, text: string) => {
    const res = await axios.post(this.baseUrl, {
      // descripion do I need this ? // TODO
      public: false,
      files: { [filename]: { content: text } },
    });
    return res.data;
  };

  updateGist = async () => {};
  deleteGist = async () => {};
}

const service = new Service();
export default service;
