## 🚀 Download
[![portfolio](https://img.shields.io/badge/Source_Code-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/markcalendario/e-commerce-with-stripe)

# E-Commerce

A simple and plain E-commerce MERN application with Stripe payment gateway integration


The main focus of this project is to implement the payment gateway using Stripe.
## Environment Variables

### Client Environment
In order for the client to work properly, you will be needing the following .env variables inside the client folder

`REACT_APP_API_URL="http://localhost:7777"`

`GENERATE_SOURCEMAP=false`

### Server Environment
To run the server, you will need to add the following environment variables the .env file in server folder

`PORT = 7777`

`ORIGIN = "http://localhost:3000"`

`SERVER = "http://localhost:7777"`

`DATABASE_URI = "mongodb://localhost:27017"`

`STRIPE_URI = "YOUR STRIPE SECRET HERE"`



## Installation

Install this project using git

```bash
    git clone https://github.com/markcalendario/e-commerce-with-stripe.git
    cd e-commerce-with-stripe
```

Install all packages and dependencies
```bash
    npm install
```

Start the client with NPM, the application will start at `http://localhost:3000`
```bash
    cd client
    npm start
```

To start the server with NPM, open new terminal/cmd prompt, then go to the `server` folder. The server will start at the same origin as client with port `7777`
```bash
    npm start
```
    
## Database Initialization

Initialize the MongoDB database by inserting the following documents in database `shopitty` and collection `products`

```json
[{
  "_id": {
    "$oid": "630330e5ae8f95f539392009"
  },
  "title": "Colorful Slip-on Unisex Streetwear Sneakers Fashion",
  "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, ex. Hic, voluptatibus avudera.",
  "price": 120.5,
  "imageId": "630330e5ae8f95f539392009.jpg"
},{
  "_id": {
    "$oid": "6303321bae8f95f53939200a"
  },
  "title": "White Sneakers for Sport with Blue Outline",
  "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, ex. Hic, voluptatibus avudera.",
  "price": 199.99,
  "imageId": "6303321bae8f95f53939200a.webp"
}]
```


    
## Lessons Learned

What I have learned while implementing Stripe

- Stripe payment gateway is simple and easy to use.
- It offers testing phase for the developers.

**Pros**

- Simple
- Has a great community
- Steep learning curve

**Cons**

- Production is not available in the Philippines, the test only

## Stripe API

This project uses [Checkout API](https://stripe.com/docs/api/checkout/sessions/create) of Stripe


## Screenshots

**Login Page**

![App Screenshot](https://i.imgur.com/javFszA.png)

**Shop Page**

![App Screenshot](https://i.imgur.com/mVgfePv.png)

**Cart Page**

![App Screenshot](https://i.imgur.com/dUIDp7v.png)

**Payment Page** - A page of Stripe

![App Screenshot](https://i.imgur.com/4HxPEE3.png)

**Payment Success Page**

![App Screenshot](https://i.imgur.com/niLDryE.png)

**Payment Cancelled Page**

![App Screenshot](https://i.imgur.com/xObaQ8I.png)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@markcalendario](https://www.github.com/markcalendario)
