# backend-store-nodejs

## rename .env.example to .env

## Instructions - Setup
- `docker-compose up -d --build`
- `npm install`
- `database name store you can change it from .env and you own credentials`
- `npm run migrate up`
- `npm run build`

## Start Application 
- `npm run dev` as dev env
- `npm run start` to production env
- default running on port 3000 you can change it from env key PORT

## For testing only change file .env 
- `only change port for dev APP_ENV=local to APP_ENV=test`
- to run all tests `npm run test`


## notes
- `collection in root StoreNodeJS.postman_collection for use API or test`


### Done

- [x] Express Server running on `http://localhost:3000/`
- [x] Migrations
- [x] Enums && config folder
- [x] MVC
- [x] JWT && middleware checkAuth 
- [x] Register 
- [x] Login 
- [X] CURD Products
- [X] CURD Orders

### TODO

- [] Only admin add product and edit it.
- [] user show only products has quantity.
- [] user show only order belongs to depend on auth and not admin.
- [] order default status is pending and admin only change it.
- [] admin only delete order and make it soft deleted.
- [] store price with orders.
- [] add coupon and offers.
- **_and more._**..


