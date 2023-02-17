# backend-store-nodejs

## rename .env.example to .env

## Instructions - Setup

- `docker-compose up -d --build`
- `npm install`
- `database name store you can change it from .env and add your own credentials`
- `npm run migrate up`
- `npm run build`

## Database configuration - All Project Configuration
`APP_ENV=test
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5433
POSTGRES_DB=store
POSTGRES_USER=store
POSTGRES_PASSWORD=store
PORT=3000
JWT_KEY=hello-world-for-jwt-secret-token
JWT_SECRET=hello-world-for-jwt-secret-token
SALT_ROUNDS=10
BCRYPT_PASSWORD=hello-world-for-jwt-secret-token`




## Start Application

- `npm run dev` as dev env
- `npm run start` to production env
- database default running on port `5432`
- default running on port 3000 you can change it from env key PORT

## For testing only change file .env
- 
- to run all tests `npm run test` 

## notes
- as best documentation
- `collection in root StoreNodeJS.postman_collection for use API or test`

### Done

- [x] Express Server running on `http://localhost:3000/`
- [x] Migrations
- [x] Enums && config folder
- [x] MVC
- [x] JWT && middleware checkAuth
- [x] Register
- [x] Login
- [x] CURD Products
- [x] CURD Orders

### TODO

- [] Only admin add product and edit it.
- [] user show only products has quantity.
- [] user show only order belongs to depend on auth and not admin.
- [] order default status is pending and admin only change it.
- [] admin only delete order and make it soft deleted.
- [] store price with orders.
- [] add coupon and offers.
- [] rollback migration 
- [] run test default env test - migrate and rollback every time.
- **_and more._**..
