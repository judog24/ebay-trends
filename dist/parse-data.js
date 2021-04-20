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
exports.parseHTML = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const format_date_1 = require("./format-date");
const prices_1 = require("./prices");
function parseHTML(html) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('obtaining DOM');
        const soldListingsDOM = yield getSoldListingsDOM(html);
        console.log('DOM obtained');
        const soldListingData = yield getSoldListingData(soldListingsDOM);
        console.log('PREPARING TO CLEAN DATA');
        const soldListings = yield cleanData(soldListingData);
        return soldListings;
    });
}
exports.parseHTML = parseHTML;
function cleanData(listings) {
    return __awaiter(this, void 0, void 0, function* () {
        let parsedListings = [];
        for (const listing of listings) {
            console.log(listing);
            console.log('getting date atttribute');
            const dateAttirubte = yield getListingAttribute(listing.date);
            console.log('getting tempdate');
            const tempDate = yield getListingDate(listing.date, dateAttirubte);
            console.log('getting listing Date');
            const listingDate = yield format_date_1.formatListingDate(tempDate);
            console.log('obtained listing date');
            const sellingPrice = yield prices_1.listingPriceToInt(listing.price);
            const shippingPrice = yield prices_1.shippingPriceToInt(listing.shipping);
            const totalPrice = yield prices_1.calcTotalPrice(sellingPrice, shippingPrice);
            const currentListing = {
                title: listing.title,
                date: listingDate,
                sellingPrice: sellingPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice
            };
            parsedListings.push(currentListing);
        }
        return parsedListings;
    });
}
function getSoldListingsDOM(html) {
    return new Promise((resolve, reject) => {
        const $ = cheerio_1.default.load(html);
        if ($('ul.srp-results')) {
            const soldListingsList = $('ul.srp-results');
            const soldListings = $('li.s-item', soldListingsList);
            resolve(soldListings);
        }
        else
            reject(new Error('Search results not found'));
    });
}
function getSoldListingData(soldListings) {
    return new Promise((resolve) => {
        const $ = require('cheerio');
        let parsedListings = [];
        soldListings.each((i, soldListing) => {
            const listingTitle = $('h3.s-item__title--has-tags', soldListing).html();
            const listingDateDOM = $('div.s-item__title--tagblock', soldListing);
            const listingPrice = $('span.s-item__price', soldListing).text().trim();
            const listingShipping = $('span.s-item__logisticsCost', soldListing).text();
            const currentListing = {
                title: listingTitle,
                date: listingDateDOM,
                price: listingPrice,
                shipping: listingShipping
            };
            parsedListings.push(currentListing);
        });
        resolve(parsedListings);
    });
}
function getListingAttribute(listingDates) {
    return new Promise((resolve) => {
        const $ = require('cheerio');
        let attr = '';
        listingDates.each((i, elem) => {
            if ($(elem).children().attr('role')) {
                console.log('element has Role attribute');
                if ($(elem).children().children().text().indexOf(' ') !== -1) {
                    console.log('empty element detected');
                    attr = $(elem).children().children().attr('class');
                }
            }
        });
        console.log('ATTRIBUTE');
        console.log(attr);
        resolve(attr);
    });
}
function getListingDate(listingDates, dateAttirubte) {
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
            }
            else if ($(elem).children().children().attr('class') === dateAttirubte) {
                console.log('attribute matched');
                console.log('MATCHING: ', $(elem).children().children().attr('class'));
                console.log('GENERATING DATE');
                currentDate += $(elem).children().children().text();
                resolve(currentDate);
            }
        });
    });
}
//# sourceMappingURL=parse-data.js.map