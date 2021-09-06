import { IPublicGistsQueryParams } from "api/types";

export const makeQueryStringFromObject = (
  qParams: IPublicGistsQueryParams
): string => {
  let queryString = "?";
  for (const [key, value] of Object.entries(qParams)) {
    queryString += `${key}=${value}&`;
  }
  return queryString.slice(0, queryString.length - 1);
};
