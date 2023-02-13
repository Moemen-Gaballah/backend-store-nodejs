# API Documentation
Api collection for team member or stakeholders 


## API All Endpoints

### Users
- Register `/api/register` [POST]
- Login `/api/login` [POST]
- Index `/api/users` [GET] [token required]
- Show `/api/users/:id` [GET] [token required]
- Update `/api/users/:id` [PUT] [token required]
- Delete `/api/users/:id` [DELETE] [token required]


### Products
- Index `/api/products` [GET]
- Store `/api/products/create` [POST] [token required]
- Show `/api/products/:id` [GET]
- Update `/api/products/:id` [PUT] [token required]
- Delete `/api/products/:id` [DELETE] [token required]

### Orders
- Index `/api/orders` [GET] [token required]
- Store `/api/orders/create` [POST] [token required]
- Show `/api/orders/:id` [GET] [token required]
- Update `/api/orders/:id` [PUT] [token required]
- Delete `/api/orders/:id` [DELETE] [token required]

# Schema

#### Users
Table: *users*
- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- email `VARCHAR`
- password `VARCHAR`
- isAdmin `VARCHAR` default false
- createdAt: `timestamp` default current date

### Products
Table: *products*
- id `SERIAL PRIMARY KEY`
- user_id `integer` `REFERENCES users(id)`
- name `VARCHAR`
- body `text` nullable
- price `INTEGER`
- image `VARCHAR` nullable
- createdAt `timestamp` default current date

### Orders
Table: *orders*
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- price `INTEGER`
- status `VARCHAR` default pending
- createdAt `timestamp` default current date

### OrderProducts
Table: *order_products*
- id `SERIAL PRIMARY KEY`
- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
- price `INTEGER`
- createdAt `timestamp` default current date
