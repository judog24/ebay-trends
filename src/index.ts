import { chromium } from "playwright";
import cheerio from "cheerio";
const fs = require('fs');
const config = require('../config');

const url: string = config.url;

interface Listing {
  title: string | null;
  date: string;
  sellingPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

parseHTML(url);

async function parseHTML(url: string) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  

  const $ = cheerio.load(html);
  const soldListingsList = $('ul.srp-results');
  const soldListings = $('li.s-item', soldListingsList);

  const listings: Listing[] = getListings(soldListings);
  writeListingsToCSV(listings);

  await browser.close();
}

function getListings(soldListings: cheerio.Cheerio): Listing[] {

  const $ = require('cheerio');

  let parsedListings: Listing[] = [];

  soldListings.each((i, soldListing) => {
    const listingTitle = $('h3.s-item__title--has-tags', soldListing).html();
    const listingDates = $('div.s-item__title--tagblock', soldListing).children().children();
    const dateAttirubte = getListingAttribute(listingDates);
    const listingDate = getListingDate(listingDates, dateAttirubte);
    const listingPrice = $('span.s-item__price', soldListing).text().trim();
    const sellingPrice = listingPriceToInt(listingPrice);
    const listingShipping = $('span.s-item__logisticsCost', soldListing).text();
    const shippingPrice = shippingPriceToInt(listingShipping);
    const totalPrice = calcTotalPrice(sellingPrice, shippingPrice);

    const currentListing: Listing = {
      title: listingTitle,
      date: listingDate,
      sellingPrice: sellingPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice
    }

  parsedListings.push(currentListing);
  });

  return parsedListings;
}

function writeListingsToCSV(listings: Listing[]): void {

  let csv_data: string = ''

  let header = `TITLE,DATE,SELLING_PRICE,SHIPPING_PRICE,TOTAL_PRICE\n`;
  csv_data += header;

  listings.forEach((listing) => {
    let row_data = `"${listing.title}", ${listing.date}, ${listing.sellingPrice}, ${listing.shippingPrice}, ${listing.totalPrice}\n`;
    csv_data += row_data;
  })

  fs.writeFile('listings.csv', csv_data, err => {
    if (err) {
      console.error(err);
      return;
    }
  })
}

function getListingAttribute(listingDates: cheerio.Cheerio): string {

  const $ = require('cheerio');

  let attr: string = '';

  listingDates.each((i, elem) => {
    if ($(elem).text().indexOf(' ') !== -1) {
      attr = $(elem).attr('class') as string;
    }
  });

  return attr;
}

function month_to_number(month: string): string {
  let month_no: string;

  switch (month) {
    case "Jan":
      month_no = '01';
      break;
    case "Feb":
      month_no = '02';
      break;
    case "Mar":
      month_no = '03';
      break;
    case "Apr":
      month_no = '04';
      break;
    case "May":
      month_no = '05';
      break;
    case "Jun":
      month_no = '06';
      break;
    case "Jul":
      month_no = '07';
      break;
    case "Aug":
      month_no = '08';
      break;
    case "Sep":
      month_no = '09';
      break;
    case "Oct":
      month_no = '10';
      break;
    case "Nov":
      month_no = '11';
      break;
    case "Dec":
      month_no = '12';
      break;
    default:
      month_no = '';
  }

  return month_no;
}

function formatDay(day: string): string {
  const tempDay = day.replace(',','');

  if (tempDay.length == 1) {
    return `0${tempDay}`;
  } else return tempDay;
}

function getListingDate(listingDates: cheerio.Cheerio, dateAttribute: string): string {

  const $ = require('cheerio');

  let currentDate = '';

  listingDates.each((i, elem) => {
    if ($(elem).attr('class') == dateAttribute) {
      currentDate += $(elem).text();
    }
  });

  const formattedDate = formatListingDate(currentDate);

  return formattedDate;
}

function formatListingDate(date: string): string {
  const tempDate = date.replace('Sold  ', '');
  const dateArray = tempDate.split(' ');

  const year = dateArray[2];
  const month = month_to_number(dateArray[0]);
  const day = formatDay(dateArray[1]);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

function listingPriceToInt(listingPrice: string): number {
  const tempPrice = listingPrice.replace('$', '');
  return parseFloat(tempPrice);
}

function shippingPriceToInt(shippingDescription: string): number {

  //Ex: '+27.20 shipping' or 'Free shipping'
  if (shippingDescription.indexOf('Free') !== -1) {
    return 0;
  } else {
    const tempDescription = shippingDescription.replace(' shipping', '');
    const tempPrice = tempDescription.replace('+$', '');
    
    return parseFloat(tempPrice);
  }
}

function calcTotalPrice(listingPrice: number, shippingPrice: number): number {
  return listingPrice + shippingPrice;
}
