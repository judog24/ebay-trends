import cheerio from "cheerio";
import { formatListingDate } from "./format-date";
import { listingPriceToInt, shippingPriceToInt, calcTotalPrice } from "./prices";
import { Listing, rawListing } from "./interfaces";

async function parseHTML(html: string) {
  console.log('obtaining DOM');
  const soldListingsDOM: cheerio.Cheerio = await getSoldListingsDOM(html);
  console.log('DOM obtained');
  const soldListingData: rawListing[] = await getSoldListingData(soldListingsDOM);
  console.log('PREPARING TO CLEAN DATA');
  const soldListings: Listing[] = await cleanData(soldListingData);

  return soldListings;
}

async function cleanData(listings: rawListing[]): Promise<Listing[]> {

  let parsedListings: Listing[] = [];

  for (const listing of listings) {
    //console.log(listing);
    console.log('getting date atttribute');
    const dateAttirubte = await getListingAttribute(listing.date);
    console.log('getting tempdate');
    const tempDate = await getListingDate(listing.date, dateAttirubte);
    console.log('getting listing Date');
    const listingDate = await formatListingDate(tempDate);
    console.log('obtained listing date');
    const sellingPrice = await listingPriceToInt(listing.price);
    const shippingPrice = await shippingPriceToInt(listing.shipping);
    const totalPrice = await calcTotalPrice(sellingPrice, shippingPrice);

    const currentListing: Listing = {
      title: listing.title,
      date: listingDate,
      sellingPrice: sellingPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice
    }

    parsedListings.push(currentListing);
  }

  return parsedListings;
}

function getSoldListingsDOM(html: string): Promise<cheerio.Cheerio> {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(html);
    
    if ($('ul.srp-results')) {
      const soldListingsList = $('ul.srp-results');
      const soldListings = $('li.s-item', soldListingsList);
      resolve(soldListings);
    } else reject(new Error('Search results not found'));
  });
}

function getSoldListingData(soldListings: cheerio.Cheerio): Promise<rawListing[]> {
  return new Promise((resolve) => {
    const $ = require('cheerio');

    let parsedListings: rawListing[] = [];

    soldListings.each((i, soldListing) => {
      const listingTitle: string = $('h3.s-item__title--has-tags', soldListing).html();
      //const listingDateDOM: cheerio.Cheerio = $('div.s-item__title--tagblock', soldListing).children().children();
      //const listingDateDOM: cheerio.Cheerio = $('div.s-item__title--tagblock', soldListing).children();
      const listingDateDOM: cheerio.Cheerio = $('div.s-item__title--tagblock', soldListing);
      /*
      console.log('first child html');
      console.log($(listingDateDOM).html());
      console.log('first child text');
      console.log($(listingDateDOM).text());

      console.log('second child html');
      console.log($(listingDateDOM).children().html());
      console.log('second child text');
      console.log($(listingDateDOM).children().text());
      console.log('parsed both versions');
      */
      const listingPrice: string = $('span.s-item__price', soldListing).text().trim();
      const listingShipping: string = $('span.s-item__logisticsCost', soldListing).text();

      const currentListing: rawListing = {
        title: listingTitle,
        date: listingDateDOM,
        price: listingPrice,
        shipping: listingShipping
      }

      parsedListings.push(currentListing);
    });

    resolve(parsedListings);
  });
}

function getListingAttribute(listingDates: cheerio.Cheerio): Promise<string> {
  return new Promise((resolve) => {
    const $ = require('cheerio');

    let attr: string = '';

    listingDates.each((i, elem) => {
      if ($(elem).children().attr('role')) {
        console.log('element has Role attribute');
        if($(elem).children().children().text().indexOf(' ') !== -1) {
          console.log('empty element detected');
          attr = $(elem).children().children().attr('class') as string;
        }
      }
      
    });

    console.log('ATTRIBUTE');
    console.log(attr);

    resolve(attr);
  });
}

function getListingDate(listingDates: cheerio.Cheerio, dateAttirubte: string): Promise<string> {
  return new Promise((resolve) => {
    const $ = require('cheerio');

    let currentDate = '';
    let cleanDate = '';

    console.log('DATE ATTRIBUTE: ', dateAttirubte);

    listingDates.each((i, elem) => {
      if (dateAttirubte.length < 1) {
        console.log('ATTRIBUTE DOES NOT MATCH');
        cleanDate += $(elem).children().html();
        resolve(cleanDate);
      } else if ($(elem).children().children().attr('class') === dateAttirubte) {
        console.log('attribute matched')
        console.log('MATCHING: ', $(elem).children().children().attr('class'));
        console.log('GENERATING DATE');
        currentDate += $(elem).children().children().text();
        resolve(currentDate);
      }
    });

    /*
    console.log('PRINT CURRENT DATE');
    console.log(currentDate);
    console.log('finished getListingDate');
    resolve(currentDate);
    */
  });
}

export { parseHTML };

