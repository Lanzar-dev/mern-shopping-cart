# MERN E-Commerce Store

Demo: https://mojestore.herokuapp.com/

**Tech**
-React
-Redux
-Node/Express
-MongoDb

**Products Features**
The basic features of the app include
Ability to:
-Add a Product on the System
-List Products
-Edit a Product
-Delete a Product
-Update the Stock
-see the Stock History
-Purchase Features (Flutterwave payment)

**Feature for users**
Ability to:
-Create a new Cart
-see the Cart and its items
-add a new Item to the Cart
-Remove an Item from the Cart
-Checkout

# Development

-clone the repo
-To install dependencies
run "npm install" in the root directory
cd into the frontend, run "npm install"
-create a .env file in the root directory, copy and paste the following:
PORT=
MONGO_URI=
NODE_ENV=
JWT_SECRET=
JWT_EXPIRE=
REACT_APP_PUBLIC_KEY=
-fill the above with your own credentials, the "REACT_APP_PUBLIC_KEY" can be gotten from your
flutterwave dashboard
-open up the terminal and in the root directory, run "npm run dev",
this starts up the client and development server concurrently.

# Deployment

I personally used Heroku for deployment, but you can use any hosting platform of your choice.
To deploy to heroku, set NODE_ENV in .env file to "production".
Use the deployment script in server.js file in the backend folder to serve the client when deployed to heroku.
NOTE: The project still has little bugs, but will fix it soon.
