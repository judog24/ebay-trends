"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const cheerio_1 = __importDefault(require("cheerio"));
const fs = require('fs');
const config = require('../config');
const url = config.url;
parseHTML(url);
function parseHTML(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield playwright_1.chromium.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto(url);
        const html = yield page.content();
        const $ = cheerio_1.default.load(html);
        const soldListingsList = $('ul.srp-results');
        const soldListings = $('li.s-item', soldListingsList);
        const listings = getListings(soldListings);
        writeListingsToCSV(listings);
        yield browser.close();
    });
}
function getListings(soldListings) {
    const $ = require('cheerio');
    let parsedListings = [];
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
        const currentListing = {
            title: listingTitle,
            date: listingDate,
            sellingPrice: sellingPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice
        };
        parsedListings.push(currentListing);
    });
    return parsedListings;
}
function writeListingsToCSV(listings) {
    let csv_data = '';
    let header = `TITLE,DATE,SELLING_PRICE,SHIPPING_PRICE,TOTAL_PRICE\n`;
    csv_data += header;
    listings.forEach((listing) => {
        let row_data = `"${listing.title}", ${listing.date}, ${listing.sellingPrice}, ${listing.shippingPrice}, ${listing.totalPrice}\n`;
        csv_data += row_data;
    });
    fs.writeFile('listings.csv', csv_data, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}
function getListingAttribute(listingDates) {
    const $ = require('cheerio');
    let attr = '';
    listingDates.each((i, elem) => {
        if ($(elem).text().indexOf(' ') !== -1) {
            attr = $(elem).attr('class');
        }
    });
    return attr;
}
function month_to_number(month) {
    let month_no;
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
function formatDay(day) {
    const tempDay = day.replace(',', '');
    if (tempDay.length == 1) {
        return `0${tempDay}`;
    }
    else
        return tempDay;
}
function getListingDate(listingDates, dateAttribute) {
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
function formatListingDate(date) {
    const tempDate = date.replace('Sold  ', '');
    const dateArray = tempDate.split(' ');
    const year = dateArray[2];
    const month = month_to_number(dateArray[0]);
    const day = formatDay(dateArray[1]);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
function listingPriceToInt(listingPrice) {
    const tempPrice = listingPrice.replace('$', '');
    return parseFloat(tempPrice);
}
function shippingPriceToInt(shippingDescription) {
    if (shippingDescription.indexOf('Free') !== -1) {
        return 0;
    }
    else {
        const tempDescription = shippingDescription.replace(' shipping', '');
        const tempPrice = tempDescription.replace('+$', '');
        return parseFloat(tempPrice);
    }
}
function calcTotalPrice(listingPrice, shippingPrice) {
    return listingPrice + shippingPrice;
}
//# sourceMappingURL=index.js.map