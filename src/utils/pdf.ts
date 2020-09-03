import crawler = require("crawler-request");

interface PdfInfo {
  url: string;
  type: "pdf" | unknown;
  text: string;
  status: number;
  error: any;
}

export const getPdfContentByUrl = async (url: string): Promise<PdfInfo> => {
  return crawler(url);
};
