# eBay-Trends

This will generate a CSV file in the program directory containing the data of the first page sold listings for a search on eBay.

CSV headers:
TITLE,DATE,SELLING_PRICE,SHIPPING_PRICE,TOTAL_PRICE

##  Installing
---

Run the following command in the unzipped folder:

    npm install
  
This will install the necessary packages to get the program running including the web browsers to get the data.

## Running
---

### Setting search parameters:

Edit `config.js` to change the search parameter.

An example search is already provided. This is just the URL that eBay generates when you view sold listings.

### Grabbing sold listing data:

`run_script.bat` will save you the hassle of opening a command prompt/PowerShell Window, otherwise it can be started by typing:

    node dist/main.js

## TODO
---
- Need to fix how dates are parsed. Sometimes the retrieved DOM will not have the date listed in plaintext.
- Browser window currently remains open and script needs to be exited manually. This is done for security reasons.
- Want to figure out a way to distribute this as an executable
- tests
