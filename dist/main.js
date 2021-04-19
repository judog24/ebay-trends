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
const parse_data_1 = require("./parse-data");
const open_page_1 = require("./open-page");
const write_csv_1 = require("./write-csv");
const config = require('../config');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const url = config.url;
    console.log('loading page');
    const html = yield open_page_1.openPage(url);
    console.log('parsing HTML');
    const listings = yield parse_data_1.parseHTML(html);
    console.log('writing CSV');
    yield write_csv_1.writeListingsToCSV(listings);
    return;
}))();
//# sourceMappingURL=main.js.map