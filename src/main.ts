import { parseHTML } from "./parse-data";
import { openPage } from "./open-page";
import { writeListingsToCSV } from "./write-csv";
const config = require('../config');

(async () => {
  const url: string = config.url;
  console.log('loading page');
  const html: string = await openPage(url);
  console.log('parsing HTML');
  const listings = await parseHTML(html);
  console.log('writing CSV');
  await writeListingsToCSV(listings);
  return;
})();