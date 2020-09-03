import crawler = require('crawler-request');

interface PageInfo {
  url: string;
  type: 'pdf' | unknown;
  html: string;
  text: string;
  status: number;
  error: any;
}

export const getPageContentByUrl = async (url: string): Promise<PageInfo> => {
  return crawler(url);
};
