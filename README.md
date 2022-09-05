# Simple Tezos Explorer

A simple block and transactions explorer on the tezos blockchain.  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## About the project

The goal of the project was to be able to query the tezos blockchain data and present basic information of the blocks and respective transactions in a simple and intuitive visual manner. 

It is made up on two essential parts, the table component for the blocks and the table component of the transactions of the corresponding block.
For the block, the information displayed is the block level, the block proposer (the proposer's alias if present, otherwise its address), the date of the block creation and the number of transactions within each block. The second table show all the transactions for the chosen block and for each transaction it shows its sender and target (again, the alias if present, otherwise its address), the amount sent and the status.

The source project structure is as follows: 

    ├── app                         
    │   ├── components                # Global multi use angular components
    │   ├── pages                     # Page components for routing
    │   ├── services                  # General services
    │   ├── app-routing.module.ts     # Routing module
    │   └── ...                       # Application component files
    ├── assets                        # Directory for assets like images, svgs, videos, etc
    ├── environments                  # Environment variables for application
    ├── styles.scss                   # Global css variables for the entire application
    └── ...                           # Boilerplate angular files

## Start the project for development

Run `npm run start` or `yarn start` for a dev server. Navigate to `http://localhost:4200/`.

## Build and run the project

Run `npm run build` or `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.  
To run the built project run `http-server dist` and navigate to `http://127.0.0.1:8080`

## Running unit tests

Run `npm run test` or `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).
