async function listingPriceToInt(listingPrice: string): Promise<number> {
  const tempPrice = listingPrice.replace('$', '');
  return parseFloat(tempPrice);
}

async function shippingPriceToInt(shippingDescription: string): Promise<number> {
  //Ex: '+$27.20 shipping' or 'Free shipping'
  if (shippingDescription.indexOf('Free') !== -1) {
    return 0;
  } else {
    const tempDescription = shippingDescription.replace(' shipping', '');
    const tempPrice = tempDescription.replace('+$', '');

    return parseFloat(tempPrice);
  }
}

async function calcTotalPrice(listingPrice: number, shippingPrice: number): Promise<number> {
  return listingPrice + shippingPrice;
}

export { listingPriceToInt, shippingPriceToInt, calcTotalPrice };