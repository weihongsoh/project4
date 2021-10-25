# Game Shop

A web app that simulates the operations of an online game shop.

## Description

The online game shop retrieves product informations (for this particular application, gaming-related products)from the database and displays them across the web page.
Consumer purchases will be logged and stored back to the database.

## Technical Tools Used

- React
- Postgres
- Python-Flask

## User Stories

From the consumer point-of-view, the consumer is able to signup and login the application to browse the whole range of available products.
Upon clicking a particular product from the range, a single product page is brought up to display additional info.
The consumer is able to add the product to their shopping cart and checkout from either page.

From the shop owner point-of-view, it is more of managing rather than purchasing, therefore, the option for adding and checking out for the shopping carts will be disabled.
A new option introduced will be to allow the removal of the existing products from the displayed range instead.

## Unsolved problems

- New purchases tend to overwrite the previously logged purchases, even for the same user within the same shopping session

## Future works

- Options for adding new products and editing/updating of existing products can be added
