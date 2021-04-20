import { listingPriceToInt, shippingPriceToInt, calcTotalPrice } from "./prices";

test('price string converts to float', async() => {
  expect.assertions(1);
  await expect(listingPriceToInt('$21.99'))
    .resolves.toBe(21.99);
});

test('removes trailing zeroes', async() => {
  expect.assertions(1);
  await expect(listingPriceToInt('$15.50'))
    .resolves.toBe(15.5);
});

test('shipping price returns as float', async() => {
  expect.assertions(1);
  await expect(shippingPriceToInt('+$4.25 shipping'))
    .resolves.toBe(4.25);
});

test('shipping price removes trailing zeroes', async() => {
  expect.assertions(1);
  await expect(shippingPriceToInt('+$3.00 shipping'))
    .resolves.toBe(3);
});

test('listings with free shipping return 0', async() => {
  expect.assertions(1);
  await expect(shippingPriceToInt('Free shipping'))
    .resolves.toBe(0);
});

test('adds listingPrice and shippingPrice to get totalPrice', async() => {
  expect.assertions(1);
  await expect(calcTotalPrice(21.99,4.90))
    .resolves.toBe(26.89);
});