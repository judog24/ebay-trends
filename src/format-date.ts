async function formatListingDate(date: string): Promise<string> {
  console.log('PREPARING TO FORMAT DATE');
  console.log(date);
  const tempDate = date.replace('Sold ', '');
  const dateArray = tempDate.split(' ');

  console.log(dateArray);

  if (dateArray.length == 4) {
    const year = dateArray[3];
    const month = await month_to_number(dateArray[1]);
    const day = await formatDay(dateArray[2]);

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    return formattedDate;
  } else {
    const year = dateArray[2];
    const month = await month_to_number(dateArray[0]);
    const day = await formatDay(dateArray[1]);

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    return formattedDate;
  }
}

async function formatDay(day: string): Promise<string> {
  const tempDay = day.replace(',','');

  if (tempDay.length == 1) {
    return `0${tempDay}`;
  } else return tempDay;
}

async function month_to_number(month: string): Promise<string> {
  let month_no: string;

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
}

export { formatDay, month_to_number, formatListingDate };