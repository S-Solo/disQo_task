import { IPublicGist } from "api/types";
import { IGistStats } from "containers/Stats/types";

// maps gists into {filesCount, created_at} objects
export const getChartDataFromPublicGists = (gistsData: IPublicGist[]) => {
  return gistsData
    .map((el) => {
      return {
        filesCount: el.files ? Object.keys(el.files).length : 0,
        created_at: el.created_at,
      };
    })
    .sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
};

interface ResType {
  createdGists: number[];
  filesPerGist: number[];
}

// filters all the data by 5 second time slots
export const constructDataPoints = (
  gistsData: IGistStats[],
  timeSlots: string[]
): ResType => {
  const res: IGistStats[][] = [];

  timeSlots.forEach((slot, idx) => {
    const time = Date.parse(slot);
    res.push(
      gistsData.filter((gist) => {
        const gistTime = Date.parse(gist.created_at);
        if (idx !== 0) {
          const prevTime = Date.parse(timeSlots[idx - 1]);
          return gistTime >= prevTime && gistTime < time;
        }
        const nextTime = Date.parse(timeSlots[idx + 1]);
        return gistTime >= time && gistTime < nextTime;
      })
    );
  });

  const createdGists = res.map((el) => el.length);
  const filesPerGist = res.map(
    (el) => el.map((el) => el.filesCount).reduce((a, b) => a + b, 0),
    0
  );
  return {
    createdGists,
    filesPerGist,
  };
};
