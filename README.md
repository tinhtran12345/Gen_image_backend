<div align="center">

  <h1>Express-Typescript Backend</h1>
  
  <p>
    The ultimate solution for generating images and  managing your receipts, invoices, and card statements! 🤩 Our cutting-edge application harnesses the power of AI to analyze your documents and provide invaluable insights into your spending habits. 🚀💪
  </p>

</div>

<br />

<!-- Table of Contents -->

# Table of Contents

-   [About the Project](#about-the-project)
    -   [Tech Stack](#tech-stack)
    -   [Features](#features)
    -   [Environment Variables](#environment-variables)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Linting](#linting)
    -   [Running Tests](#running-tests)
    -   [Run Locally](#run-locally)
    -   [Run with Docker](#run-with-docker)
-   [License](#license)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

<!-- About the Project -->

## About the Project

<!-- TechStack -->

### Tech Stack

-   **_Express.js_**
-   **_Typescript_**
-   **_NPM_**
-   **_MongoDB_**

<!-- Features -->

### Features

-   **_Package managament_** with Npm
-   **_Testing_** with Jest and Supertest
-   **_Cross-Origin Resource-Sharing_** enabled using cors
-   **_Secured HTTP Headers_** using helmet
-   **_Logging_** with winston
-   **_Environment variables_** using dotenv
-   **_Compression_** with gzip
-   **_Git hooks_** with husky and lint-staged
-   **_Linting and enforced code style_** using Eslint and Prettier
-   **_Containerization_** with Docker

<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` =

`PORT` =

`DATABASE_URL` =

`CLOUD_NAME` =

`API_KEY` =

`API_SECRET` =

`OPENAI_KEY` =

`HUGGING_FACE_KEY` =

`LANGCHAIN_CALLBACKS_BACKGROUND`=true

`CORS_ORIGIN` = "http://localhost:3000/"

`COMMON_RATE_LIMIT_WINDOW_MS`="1000"

`COMMON_RATE_LIMIT_MAX_REQUESTS`="20"

See .env.example for further details

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global
```

<!-- Installation -->

### Installation

-   Clone project

```bash

git clone https://github.com/tinhtran12345/Gen_image_backend.git


```

Go to the project directory

```bash
  cd server
```

Install packages

```bash
  npm i install
```

### Linting

```bash
  # run ESLint
  npm run lint

  # fix ESLint errors
  npm run lint:fix

  # run prettier
  npm run code:check

  # fix prettier errors
  npm run code:format

  # fix prettier errors in specific file
  npm run code:format:specific-file <file-name>
```

<!-- Running Tests -->

### Running Tests

To run tests, run the following command

```bash
  npm run test
```

<!-- Run Locally -->

### Run Locally

Start the server in development mode

```bash
  npm run dev
```

Start the server in production mode

```bash
  npm run start
```

<!-- Run with Docker -->

### Run with Docker

Build the container

```bash
  cd server
  docker build . -t server
```

Using docker compose

```bash
  docker compose up -d
```

<!-- License -->

## License

Distributed under the MIT License. See LICENSE.txt for more information.
