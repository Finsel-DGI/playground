# Demobutik - E-commerce Demonstration Store

Welcome to the Demobutik, an e-commerce demonstration store designed to showcase the capabilities of the pasby eID and the pasby app. This application allows users to experience seamless commerce flows using their pasby eID in a secure and efficient manner.

## Overview

The Demobutik is a Next.js application that simulates an e-commerce environment where users can test various commerce flows without any real monetary transactions. The application is integrated with pasby eID, providing a secure and straightforward authentication and payment process.

### Key Features

- **Seamless Checkout**: Experience a smooth checkout process with minimal input required.
- **Secure Authentication**: Utilize pasby eID for secure and straightforward login.
- **3D Secure Payments**: Test 3D secure card authentication to streamline transactions while ensuring compliance with PSD2 regulations.
- **Data Privacy**: Your personal data is safe and not used for sales or marketing purposes.

## Getting Started

To get started with the Demobutik application, follow these steps:

### Prerequisites

- Ensure you have Node.js and npm installed on your machine.
- You will need a pasby eID and the pasby app to fully experience the application.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Finsel-DGI/playground.git
   ```

2. Navigate to the project directory:

   ```bash
   cd demobutik
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Setting things up

You will need these pasby credentials to run this application

```
PASBY_CLIENT_SECRET=<prd_>
PASBY_CONSUMER_KEY=<bk->
PASBY_CLIENT_ID=<app_>
SECRET_GEN=<generate a random 16 digit and input that here>
```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

Open [http://localhost:3430](http://localhost:3430) in your browser to view the application.

### Usage

- **Login**: Use the pasby app to log in securely.
- **Browse Products**: Explore the curated product listings.
- **Checkout**: Test the checkout process using the pasby eID for authentication and payment.

### API Endpoints

The application includes several API endpoints to facilitate the demonstration of commerce flows:

- **Authentication**: `/api/eid/[auth]` - Handles user authentication using pasby eID.
- **Payment Confirmation**: `/api/confirm-with-pasby` - Simulates payment confirmation using pasby eID.

## Learn More

To learn more about Next.js and its features, visit the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Contributing

We welcome contributions to enhance the Demobutik application. Please feel free to submit pull requests or open issues for any improvements or bug fixes.

## License

This project is licensed under the MIT License.


Enjoy exploring the capabilities of pasby eID with the Demobutik demonstration store!