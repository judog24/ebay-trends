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
const prices_1 = require("./prices");
test('price string converts to float', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(prices_1.listingPriceToInt('$21.99'))
        .resolves.toBe(21.99);
}));
test('removes trailing zeroes', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(prices_1.listingPriceToInt('$15.50'))
        .resolves.toBe(15.5);
}));
test('shipping price returns as float', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(prices_1.shippingPriceToInt('+$4.25 shipping'))
        .resolves.toBe(4.25);
}));
test('shipping price removes trailing zeroes', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(prices_1.shippingPriceToInt('+$3.00 shipping'))
        .resolves.toBe(3);
}));
test('listings with free shipping return 0', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(prices_1.shippingPriceToInt('Free shipping'))
        .resolves.toBe(0);
}));
test('adds listingPrice and shippingPrice to get totalPrice', () => __awaiter(void 0, void 0, void 0, function* () {
    expect.assertions(1);
    yield expect(prices_1.calcTotalPrice(21.99, 4.90))
        .resolves.toBe(26.89);
}));
//# sourceMappingURL=prices.test.js.map