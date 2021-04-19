interface Listing {
  title: string | null;
  date: string;
  sellingPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

interface rawListing {
  title: string;
  date: cheerio.Cheerio;
  price: string;
  shipping: string;
}


export { Listing, rawListing }