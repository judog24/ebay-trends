import { formatDay, month_to_number, formatListingDate } from "./format-date";

test('easy to parse date received', async() => {
  expect.assertions(1);
  await expect(formatListingDate('Sold  Apr 19, 2021'))
    .resolves.toBe('2021-04-19');
}); 

test('comma is removed from date', async() => {
  expect.assertions(1);
  await expect(formatDay('18,'))
    .resolves.toBe('18');
});

test('adds leading zero when date is before the tenth', async() => {
  expect.assertions(1);
  await expect(formatDay('3,'))
    .resolves.toBe('03');
});

test('changes month to number', async() => {
  expect.assertions(13);
  await expect(month_to_number('Jan'))
    .resolves.toBe('01');
  await expect(month_to_number('Feb'))
    .resolves.toBe('02');
  await expect(month_to_number('Mar'))
    .resolves.toBe('03');
  await expect(month_to_number('Apr'))
    .resolves.toBe('04');
  await expect(month_to_number('May'))
    .resolves.toBe('05');
  await expect(month_to_number('Jun'))
    .resolves.toBe('06');
  await expect(month_to_number('Jul'))
    .resolves.toBe('07');
  await expect(month_to_number('Aug'))
    .resolves.toBe('08');
  await expect(month_to_number('Sep'))
    .resolves.toBe('09');
  await expect(month_to_number('Oct'))
    .resolves.toBe('10');
  await expect(month_to_number('Nov'))
    .resolves.toBe('11');
  await expect(month_to_number('Dec'))
    .resolves.toBe('12');
  await expect(month_to_number('April'))
    .resolves.toBe('');
});