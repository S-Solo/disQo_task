import Button from "components/Button";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Line } from "react-chartjs-2";
import service from "api/service";
import { GISTS_PER_PAGE } from "consts/gists";
import {
  constructDataPoints,
  getChartDataFromPublicGists,
} from "utils/getChartDataFromPublicGists";
import { IGistStats } from "./types";
import { getFormattedTimeSlots, getTimeSlots } from "utils/dateUtils";

const timeSlots = getTimeSlots();
const timeSlotsFormatted = getFormattedTimeSlots(timeSlots);

const Stats: React.FC = () => {
  const [gistsPage, setGistsPage] = useState(1);
  const [gistsData, setGistsData] = useState<IGistStats[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { createdGists, filesPerGist } = useMemo(() => {
    return constructDataPoints(gistsData, timeSlots);
  }, [gistsData]);
  const gistsCreatedState = useMemo(
    () => ({
      labels: timeSlotsFormatted,
      datasets: [
        {
          label: "Gists Created",
          backgroundColor: ["#39ACDC"],
          hoverBackgroundColor: ["#39ACDC"],
          data: createdGists,
        },
      ],
    }),
    [createdGists]
  );
  const filesPerGistState = useMemo(
    () => ({
      labels: timeSlotsFormatted,
      datasets: [
        {
          label: "Files per Gist",
          backgroundColor: ["#39ACDC"],
          hoverBackgroundColor: ["#39ACDC"],
          data: filesPerGist,
        },
      ],
    }),
    [filesPerGist]
  );

  const LoadMoreButtom = () => (
    <Button
      className="mt-3"
      type="white"
      onClick={() => {
        setGistsPage(gistsPage + 1);
      }}
      disabled={loading}
    >
      {!loading ? "Load More" : "Loading..."}
    </Button>
  );

  useEffect(() => {
    const getGists = async () => {
      setLoading(true);
      const res = await service.getPublicGists({
        page: gistsPage,
        per_page: GISTS_PER_PAGE,
      });
      if (res) {
        setGistsData((gistsData) => [
          ...gistsData,
          ...getChartDataFromPublicGists(res),
        ]);
      }
      setLoading(false);
    };
    getGists();
  }, [gistsPage]);

  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col w-4/5 pl-10">
        <div className="flex flex-col items-center">
          <Line
            data={gistsCreatedState}
            options={{
              title: {
                display: true,
                text: "Gists",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
          <LoadMoreButtom />
        </div>

        <div className="flex flex-col mt-10 items-center">
          <Line
            data={filesPerGistState}
            options={{
              title: {
                display: true,
                text: "Files per gist",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "left",
                text: "Number of gists",
              },
            }}
          />
          <LoadMoreButtom />
        </div>
      </div>
      <Button
        type="white"
        onClick={() => {
          history.push("/");
        }}
      >
        Close Stats
      </Button>
    </div>
  );
};

export default Stats;
