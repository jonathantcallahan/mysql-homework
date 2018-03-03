## **Node MySQL Project**

The program is a simple storefront. There are two interfaces: one for users that allows the purchase of items, one for managers that can check inventory, add inventory, and create new items. 

A .env file is used to store sensitive information. Password information will have to be updated in order to use the program. 

Below are screenshots of the program running in the console.

**User:**

 - bamazonCustomer.js
 - Promts user to enter the item id for the item they would like to purchase
![First User Prompt](https://i.imgur.com/zdB7xKw.png)
 - Promts user to enter the amount of items they would like to purchase
 ![enter image description here](https://i.imgur.com/oS3546a.png)
 - Subtracts those items from the inventory in the database
![enter image description here](https://i.imgur.com/6UHOFEk.png)

**Manager**

- bamazonManager.js
- Offers four options to the user
![enter image description here](https://i.imgur.com/xsaRYY3.png)
-- View products for sale will display full inventory list
![enter image description here](https://i.imgur.com/0HX8aR0.png)
-- View low inventory
![enter image description here](https://i.imgur.com/vBCl32Y.png)
-- Add to inventory
![enter image description here](https://i.imgur.com/SCLAnaY.png)
![enter image description here](https://i.imgur.com/H5trFw1.png)
-- Add new product
![enter image description here](https://i.imgur.com/drRGoMb.png)