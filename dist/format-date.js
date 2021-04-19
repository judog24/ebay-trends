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
exports.formatListingDate = exports.month_to_number = exports.formatDay = void 0;
function formatListingDate(date) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('PREPARING TO FORMAT DATE');
        console.log(date);
        const tempDate = date.replace('Sold ', '');
        const dateArray = tempDate.split(' ');
        console.log(dateArray);
        if (dateArray.length == 4) {
            const year = dateArray[3];
            const month = yield month_to_number(dateArray[1]);
            const day = yield formatDay(dateArray[2]);
            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            return formattedDate;
        }
        else {
            const year = dateArray[2];
            const month = yield month_to_number(dateArray[0]);
            const day = yield formatDay(dateArray[1]);
            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            return formattedDate;
        }
    });
}
exports.formatListingDate = formatListingDate;
function formatDay(day) {
    return __awaiter(this, void 0, void 0, function* () {
        const tempDay = day.replace(',', '');
        if (tempDay.length == 1) {
            return `0${tempDay}`;
        }
        else
            return tempDay;
    });
}
exports.formatDay = formatDay;
function month_to_number(month) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.month_to_number = month_to_number;
//# sourceMappingURL=format-date.js.map