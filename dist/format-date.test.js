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
const format_date_1 = require("./format-date");
test('easy to parse date received', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(format_date_1.formatListingDate('Sold  Apr 19, 2021'))
        .resolves.toBe('2021-04-19');
}));
test('comma is removed from date', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(format_date_1.formatDay('18,'))
        .resolves.toBe('18');
}));
test('adds leading zero when date is before the tenth', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(format_date_1.formatDay('3,'))
        .resolves.toBe('03');
}));
test('changes month to number', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(13);
    yield expect(format_date_1.month_to_number('Jan'))
        .resolves.toBe('01');
    yield expect(format_date_1.month_to_number('Feb'))
        .resolves.toBe('02');
    yield expect(format_date_1.month_to_number('Mar'))
        .resolves.toBe('03');
    yield expect(format_date_1.month_to_number('Apr'))
        .resolves.toBe('04');
    yield expect(format_date_1.month_to_number('May'))
        .resolves.toBe('05');
    yield expect(format_date_1.month_to_number('Jun'))
        .resolves.toBe('06');
    yield expect(format_date_1.month_to_number('Jul'))
        .resolves.toBe('07');
    yield expect(format_date_1.month_to_number('Aug'))
        .resolves.toBe('08');
    yield expect(format_date_1.month_to_number('Sep'))
        .resolves.toBe('09');
    yield expect(format_date_1.month_to_number('Oct'))
        .resolves.toBe('10');
    yield expect(format_date_1.month_to_number('Nov'))
        .resolves.toBe('11');
    yield expect(format_date_1.month_to_number('Dec'))
        .resolves.toBe('12');
    yield expect(format_date_1.month_to_number('April'))
        .resolves.toBe('');
}));
//# sourceMappingURL=format-date.test.js.map