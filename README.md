<h1 align="center">
  <br>
  <a><img src="https://github.com/khandelwal-arpit/hapijs-starterkit/blob/master/assets/images/logo.png" alt="hapi.js" width="400"></a>
  <br>
  hapi.js Starterkit
  <br>
</h1>

<h4 align="center">Production ready starterkit for hapi.js applications.</h4>

<p align="center">
    <a alt="Node.js">
        <img src="https://img.shields.io/badge/Node.js-LTS-green.svg" />
    </a>
    <a alt="hapi.js">
        <img src="https://img.shields.io/badge/hapi.js-18.x-yellowgreen.svg" />
    </a>
    <a alt="Docker">
        <img src="https://img.shields.io/badge/Docker-18.09-yellowgreen.svg" />
    </a>
    <a alt="Dependencies">
        <img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg" />
    </a>
    <a alt="Contributions">
        <img src="https://img.shields.io/badge/contributions-welcome-orange.svg" />
    </a>
    <a alt="License">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
    </a>
</p>

## Table of Contents ##
1. [Philosophy](#Philosophy)
2. [Application](#Application)
3. [Technology](#Technology)
4. [Application Structure](#Application-Structure)
5. [Environment Variables](#.env-Configuration)
6. [Run Locally](#Running-the-server-locally)
7. [Run Insider Docker](#Running-the-server-in-Docker-Container)
8. [API Versioning](#REST-API-Versioning)
9. [Testing](#Testing)
10. [SSL Support](#SSL-Support)
11. [Contributor](#Contributor)
12. [License](#License)

## Philosophy ##
hapi.js (also known as hapi) is an open-source framework for web applications. The most common use of hapi is to build web services such as JSON API. You can build application programming interface (API) servers, websites, and HTTP proxy applications with hapi.js. It was created by the mobile team at Walmart Labs—led by Eran Hammer, who created OAuth—to handle their traffic for events like Black Friday, one of the busiest days for online shopping in the U.S. calendar.

The original versions of hapi used the Express framework. Walmart found that there were limitations with Express that made the framework unsuitable for their particular requirements. Express was missing some key features, so Walmart eventually had hapi evolve to its own stand-alone framework.

hapi provides a robust plugin system that allows you to add new features and fix bugs at a fast pace. hapi enables you to build scalable APIs, also it is an excellent choice for building Representational State Transfer (REST) APIs because it provides you with routing, input, output validation, and caching. You can build an API that serves all kinds of clients that need mobile and single-page applications.

You can also use MySQL, MongoDB, and Postgres with hapi.js. hapi also allows you to build static websites. It provides a templating engine to render the dynamic content. You can use hapi.js with any front-end framework, like React, Angular, and Vue.js to create a single-page application.

## Application ##
This hapi.js starterkit serves as a great starting point for all the hapi developers who were looking for a hapi based platform as their production server. Once succesfully deployed, this kit gives developers access to the following two modes of interaction with the server:

1. localhost:8000 - Serve web request <br />
2. localhost:8000/api - Serve rest api request

WEB and RESTAPI both have their independent authentication mechanisms, the web application uses the cookie based authentication and the RESTAPI uses the JWT authentication for access. This application assumes the availability of 'MongoDB' installation on the localhost where the server will run or the use of docker-compose to boot up a mongodb container and link the application with it within the realm of docker.

The app contains basic user management with login, logout, password reset, profile view. Forgot password implementation is done using 'nodemailer' (sends an email with reset password link with a unique token that expires in 1 hour). All the environment variables are managed using 'dotenv' node package for development, the same will need to be configured at the host server in the production environment.

If you are using 'Chrome' for unit testing the application, you can Hapi-ly use the 'node-inspector' chrome plugin pre-configured with this app for debugging purposes.

## Technology ##
- **Hapi** - Server side framework
- **Docker** - Docker container support
- **Handlebar** - HTML templating engine
- **Mongoose** - Mongo database ORM
- **SASS** - CSS preprocessor 
- **WebPack** - Asset pipeline
- **Dotenv** - Environment variable emulator
- **Good** - Logger mechanism
- **JWT** - Authentication mechanism for APIs
- **Config** - Configuration Handler
- **Nodemailer** - Module to send emails
- **Mocha** - Unit test framework

## Application Structure ##
```
├── app
│   ├── controllers
│   │   ├── api            // Controllers are organized by module names for rest api 
│   │   └── web            // Controllers are organized by module names for web api.
│   ├── helpers            // Helpers contains methods that are access by both api and                                web controllers.
│   ├── models             // All mongoose models are defined here
│   ├── routes             // All app routes are defined here
│   │   ├── mobileApi      // RESTAPI routes for multiple versions V1 & V2.
│   │   │   ├── v1         // Routes for version1
│   │   │   └── v2         // Routes for version2
│   │   └── webApi         // WEB api routes.
│   └── templates          // All server-rendered handlebar templates, partials and                                helpers
├── assets                 // Contains all static resources 
│   ├── fonts              // Fonts used in application
│   ├── images             // Images used in application
│   ├── scripts            // Scripts used in application
│   │   ├── js             // User defined scripts
│   │   └── vendor         // Vendor scripts.
│   └── styles             // All SASS stylesheets
├── config                 // Contains all app configurations
│   ├── assets.js          // Assets configuration file
│   ├── config.js          // Application configuration. 
│   ├── default.json       // Configuration file.
│   ├── manifest.js        // App manifest file listing all plugins and load order.
│   ├── meta.js            // App metadata file.
│   └── ssl                // Contains ssl certificates
├── lib                    // Core application lib/plugins
├── logs                   // Contains app log file 
├── .gitignore             // standard git ignore file
├── .babelrc               // Babel config
├── .eslintrc              // Define eslint rules.
├── .eslintignore          // Ignores certain files for eslint rules
├── Dockerfile             // Standard doceker file
├── docker-compose.yml     // Standard docker compose file 
├── server.js              // Contains all app configurations
├── .env                   // dotenv configuration file for environment variable 
└── test
    ├── testcases          // Testcases organized by module names.
    └── test.js            // Test file.

```

## Code ##
We're using semi-colons and comma-last. No rhyme or reason; and some of the hapi [code convention guidelines](http://hapijs.com/styleguide). All client-side js code is also in commonJS pattern packs using webpack. Check out `.eslintrc` for additional code conventions used.

## .env Configuration ##
To simulate ENV vars in Dev environment, please create .env file at the root location and define the following properties -

```
DEBUGGER=false                                      // Enable/disable debug mode
NODE_ENV=production                                 // Node environment development/production
PORT=8000                                           // Server Port
SERVER_HOST=0.0.0.0                                 // Hapi Server host
COOKIE_SECRET=This_Should_be_32_characters_long
YAR_COOKIE_SECRET=This_Should_be_32_characters_long
JWT_SECRET=This_Should_be_32_characters_long
GMAIL_ID=Sender's Gmail Id
GMAIL_PASSWORD=Gmail password
GMAIL_SENDEREMAIL=Display email id for sender       // Could be same or different than GMAIL_ID
GMAIL_SENDERNAME=Sender's name to display in email
MAIL_HOST=smtp.gmail.com                            // Mail host
MAIL_PORT=465                                       // Mail Port
SWAGGER_HOST=localhost:8000                         // Host Url for Swagger
DATABASE_URL=mongodb://localhost:27017/hapijstestdb // Mongo database url
#DATABASE_URL=mongodb://mongodb:27017/hapijstestdb  // Mongo database url while using docker

```
Please make sure you remove any _.env_ file present at the root of this project before you invoke docker-compose or else docker will pick up the environment variables from this file and may lead to inconsistent results in live environments.

## Running the server locally ##

 - Install Node.js
 - Define env variables as suggested earlier
 - Run the following commands
```sh
# Install deps
$ npm install

# Run the node server in dev mode
$ npm start

# Run the node server in production mode
$ npm run prod
```
The servers should be running at: <br/> [localhost:8000](https://localhost:8000)

## Running the server in Docker Container ##
Prerequisite For Docker Configuration: 
  Docker and docker compose must be installed on the system.

Steps to run app in docker container:
  1. CD to project dir
  2. Create build using cmd: $ docker-compose build
  3. Start the server in daemon thread using cmd: $ docker-compose up -d  
  4. Stop the server using cmd : $ docker-compose down

In case you are willing to use this project as is (i.e. without external mongodb installation), the docker-compose provided with this project should suffice. It brings along a _mongodb_ service which stores the data in the _/db/data_ directory. But in case you wish to use your existing MongoDB installation then please remove the _mongodb_ service from the docker-compose.yml file and correct the database_url environment variable.

## REST API Versioning ##
The starterkit now supports versioning out of the box. For sample purposes, v1 and v2 folders with appropriate route handlers are shared with this boilerplate. The versioning is done at the router's level only. Services are still placed at a single place with no support for versioning.

## Testing ##
Hapiness now supports writing unit test cases using 'Mocha' and 'Supertest' node packages. To execute the test cases please run the following command:
```sh
# Test the server
$ npm test
```

## SSL Support ##
SSL support has been provided using self signed certificates. Users may replace the certificates placed at config/ssl directory with their proprietary certificates.

The SSL support can be suppressed by commenting out the following lines in config/manifest.js: 
```
tls: Config.get('/tlsOptions')
```

## Nodemailer Configuration ##
User may replace their gmail credentials in the .env file for debugging purpose on local environment.
However, for production the credentials should be set as environment variables.

## Contributors ##
[Arpit Khandelwal](https://www.linkedin.com/in/arpitkhandelwal1984/)

## License ##
This project is licensed under the terms of the MIT license.