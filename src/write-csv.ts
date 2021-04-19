import { Listing } from "./interfaces";
const fs = require('fs');

function writeListingsToCSV(listings: Listing[]) {
  return new Promise((resolve, reject) => {
    let csv_data: string = '';

    let header = `TITLE,DATE,SELLING_PRICE,SHIPPING_PRICE,TOTAL_PRICE\n`;
    csv_data += header;

    listings.forEach((listing) => {
      let row_data = `"${listing.title}", ${listing.date}, ${listing.sellingPrice}, ${listing.shippingPrice}, ${listing.totalPrice}\n`;
      csv_data += row_data;
    });

    fs.writeFile('listings.csv', csv_data, (err, data) => {
      if (err) reject('File could not be written');
      resolve(data);
    })
  }); 
}

export { writeListingsToCSV }