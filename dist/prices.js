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
exports.calcTotalPrice = exports.shippingPriceToInt = exports.listingPriceToInt = void 0;
function listingPriceToInt(listingPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        const tempPrice = listingPrice.replace('$', '');
        return parseFloat(tempPrice);
    });
}
exports.listingPriceToInt = listingPriceToInt;
function shippingPriceToInt(shippingDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        if (shippingDescription.indexOf('Free') !== -1) {
            return 0;
        }
        else {
            const tempDescription = shippingDescription.replace(' shipping', '');
            const tempPrice = tempDescription.replace('+$', '');
            return parseFloat(tempPrice);
        }
    });
}
exports.shippingPriceToInt = shippingPriceToInt;
function calcTotalPrice(listingPrice, shippingPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        return listingPrice + shippingPrice;
    });
}
exports.calcTotalPrice = calcTotalPrice;
//# sourceMappingURL=prices.js.map