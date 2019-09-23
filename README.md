# Quick-Credit
[![Build Status](https://travis-ci.org/Pomile/Quick-Credit.svg?branch=develop)](https://travis-ci.org/Pomile/Quick-Credit) [![Coverage Status](https://coveralls.io/repos/github/Pomile/Quick-Credit/badge.svg?branch=develop)](https://coveralls.io/github/Pomile/Quick-Credit?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/67e2c922e329af4dbe30/maintainability)](https://codeclimate.com/github/Pomile/Quick-Credit/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/67e2c922e329af4dbe30/test_coverage)](https://codeclimate.com/github/Pomile/Quick-Credit/test_coverage)

## Project Description
Quick Credit is an online lending platform that provides short term soft loans to individuals.This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

## Project Pipeline
- [Pivotal Tracker stories](https://www.pivotaltracker.com/n/projects/2326785)
- [UI Templates](https://pomile.github.io/Quick-Credit/dist/)


## Features
1. User sign up and sign in
2. User can apply for a loan
3. User can view all loan repayment history.
4. Admin can mark a client as verified after confirming the client’s work or home address.
5. Admin can view all loan applications.
6. Admin can view a specific loan application.
7. Admin can view current loans (not fully repaid).
8. Admin can view all repaid loans.
9. Admin can approve or reject a client’s loan application.
10. Admin can post loan repayment transaction in favour of a client.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Ensure you have the following installed on your local machine:
- [NodeJS](https://nodejs.org/en/download/)

## Technologies

* Express - web framework
* Nodejs- Runtime Environment for Javascript.
* [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [supertest](https://github.com/visionmedia/supertest) - Test framework and other dependencies
* [nyc](https://www.npmjs.com/package/nyc) and [istanbul](https://github.com/istanbuljs/nyc) - for coverage test.
* [morgan](https://www.npmjs.com/package/morgan) - logging library

## Endpoints

- POST /api/v1/auth/signup
- POST /api/v1/auth/signin
- POST /api/v1/users/:id/address
- POST /api/v1/users/:id/job
- POST /api/v1/loans
- GET /api/v1/loans
- PATCH /api/v1/users/:email/verify
- PATCH /api/v1/loans/:id
- GET /api/v1/loans/:id
- POST /api/v1/loans/:id/repayment
- GET /api/v1/loans/:id/repayment

## Production
Frontend
[Quick-Credit](https://pomile.github.io/Quick-Credit/dist/)
Heroku
[https://quick-credit-v1.herokuapp.com/](https://quick-credit-v1.herokuapp.com/)

## Installation
To run the application on your local machine, please follow the guidelines below.
 - Install Nodejs on your machine
 - Clone the repository
 - cd into project folder
 - Install the dependencies and devDependencies

**Example**
```sh
>git clone https://github.com/Pomile/Quick-Credit.git
>cd into quick-credit
>npm install
```

## Development
Enter the command below in the project root directory to the run the app in a development enviroment. In this case you will need to download and use [Postman](https://www.getpostman.com/downloads/) to perfom your test.
Before you start the server in development make sure you do the following:
1. Follow installation guidelines
2. Install postgres
3. Create database for development
4. create .env file and define your variables
```
   TOKEN_SECRET = xxxxxxx
   PG_DATABASE=xxxxx
   PG_PASSWORD=xxxxx
   PG_PORT=xxxx
   PG_USERNAME=xxxxxx
   TEST_DATABASE=xxxx_credxxx_test
   DEV_DATABASE=xxxk_xxxx_dev
   TRAVIS_PASSWORD=null
   DB_PORT=xxxx
   DB_PASSWORD=xxxx
   DB_USER=xxxx
   DB_HOST=xxxxx
   ADMIN_PASSWORD=xxxxx

```
3. Run the command below.

```sh
>npm start:dev
```
## Test
Enter the command below in the project root directory to run the app in a test enviroment.

1. Follow installation guidelines
2. Install postgres
3. Create database for test
4. create .env file and define variables. See example in development.
2. Execute the command below
```sh
>npm run local:test
   or
>npm run test-with-nodemon
```
## Documentation

API BLUEPRINT 
[docs](https://alex308.docs.apiary.io/)

## Frontend
github url
```
https://pomile.github.io/Quick-Credit/dist/
```

**To log in as an admin user use**
```
Email: admin@gmail.com
password: kingslanding1
click submit button
```
**To develop the frontend with webpack devServer and have it open in a browser, please follow the guidelines below:**

```
1. open command line
2. Clone the project https://github.com/Pomile/Quick-Credit.git
3. cd to the root of the project directory
4. enter `npm install`
5  Enter `npm run start:webpack-devServer`
6. Open another command line
7. Repeat step 3
8. Enter `npm run start:dev` - This is to start the server
```


## contributing:

- Clone the repository.
- Install dependencies
- Create a new branch for included feature(s)
- Raise a pull request.

# Author
Babatunde Ogedengbe
