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
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const fs = require('fs');
const config = require('../config');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const url = config.url;
    const html = yield openPage(url);
    yield parseHTML(html);
    return;
}))();
function openPage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield playwright_1.chromium.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto(url);
        console.log('browser opened');
        yield page.$('ul.srp-results');
        console.log('element found');
        const html = yield page.content();
        console.log('page loaded');
        yield browser.close();
        return html;
    });
}
function parseHTML(html) {
    return __awaiter(this, void 0, void 0, function* () {
        const listings = yield getListings(soldListings);
        yield writeListingsToCSV(listings);
    });
}
function getListings(soldListings) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = require('cheerio');
        let parsedListings = [];
        soldListings.each((i, soldListing) => __awaiter(this, void 0, void 0, function* () {
            const dateAttirubte = yield getListingAttribute(listingDates);
            const listingDate = yield getListingDate(listingDates, dateAttirubte);
            const sellingPrice = yield listingPriceToInt(listingPrice);
            const shippingPrice = yield shippingPriceToInt(listingShipping);
            const totalPrice = yield calcTotalPrice(sellingPrice, shippingPrice);
            const currentListing = {
                title: listingTitle,
                date: listingDate,
                sellingPrice: sellingPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice
            };
            parsedListings.push(currentListing);
        }));
        return parsedListings;
    });
}
function writeListingsToCSV(listings) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
//# sourceMappingURL=index.js.map