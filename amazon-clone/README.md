# Amazon Clone using React, Firebase, and Stripe Checkout

This is an Amazon clone web application built using React, Firebase, and Stripe Checkout. It allows users to browse and search for products, add them to the cart, and proceed to checkout using the Stripe payment gateway for making payments.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with Firebase authentication
- Real-time product data from Firebase Firestore
- Add products to the cart
- Update cart items and quantities
- Remove items from the cart
- Calculate total cart price
- Secure checkout using Stripe payment gateway
- Real-time order history for authenticated users

## Installation

1. Clone the repository to your local machine using `git clone`.
2. Change to the project directory using `cd amazon-clone`.
3. Install the dependencies using `npm install` or `yarn install`.

## Usage

1. Create a Firebase project and set up Firebase authentication (if not already done).
2. Create a Firebase Firestore database and add product data to it.
3. Create a Stripe account and obtain the necessary API keys.
4. Update the Firebase and Stripe configuration in the `src/firebase.js` file with your own credentials.
5. Start the development server using `npm start` or `yarn start`.
6. Open the web application in your browser at `http://localhost:3000`.

## Technologies Used

- React
- Firebase (Firebase Authentication and Firestore)
- Stripe Checkout

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository, create a branch, make your changes, and submit a pull request.
