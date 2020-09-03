import { BASE_URL } from "../environment";
import { PageName } from "../@types";

import { ClientFunction } from "testcafe";

export function getPageUrlByName(name: PageName) {
  switch (name) {
    case "HOME":
      return `${BASE_URL}`;
    case "SEARCH":
      return `${BASE_URL}/search`;

    default:
      throw new Error(`Unknown page name ${name}`);
  }
}

export const getCurrentUrl = async () => {
  const getUrl = ClientFunction(() => window.location.href);
  return getUrl();
};

// Note: query to js object code from https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object#answer-8649003
export const getCurrentUrlQuery = async () => {
  const getQuery = ClientFunction(() => location.search.substring(1));
  const query = await getQuery();

  if (!query || query.length === 0) {
    return {};
  }

  return JSON.parse(
    '{"' +
      decodeURI(query)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const addQuery = (url: string, key: string, value: string) => {
  const pageUrl = new URL(url);

  const params = new URLSearchParams(pageUrl.search.slice(1));

  params.set(key, value);

  pageUrl.search = "?" + params.toString();
  return pageUrl.toString();
};

export const relativeOrAbsoluteUrl = (url: string) => {
  const isRelativeUrl = url.startsWith("/") && !url.startsWith("//");

  return isRelativeUrl ? `${BASE_URL}${url}` : url;
};
