# Express CRUD small school project

<br>

PORT: `4000`

Generated with [express-generator](https://expressjs.com/en/starter/generator.html).

<br>

![sample](./public/img/sample.png)
<small>View via Firefox for proper styling</small>

<br>

![diagram](./public/img/diagram.png)
<small>ER diagram</small>

<br>

### Requires:

1. [Node.js 14.17+](https://nodejs.org/en/download/)

2. [MySQL 8.0.25+](https://dev.mysql.com/downloads/)

<br>

## 1. Clone repository

    git clone https://github.com/demetreades/myapp.git

`pwd` for current path.

`ls` for file list.

`cd /myapp` if you are not already into.

<br>

## 2. Install dependencies

If you cloned the repo you need to install dependencies first as listed in the `package.json`.

    npm i or yarn

<br>

## 3. Generate database

- Firstly fill your local credentials into `/database/seeder.js`

       npm run DATA:import

  Run `DATA:import` script to generate, use schema, create and populate tables.

<br>

- You also need to fill again your local credentials at `/database/credentials.js` for the main connection with the newly created database, for the server to start properly via start script.

<br>

## 4. Start server

    npm start

<br>

## 5. Navigation

List of current active endpoints:

<br>

| URLs                                                        | Endpoints |
| :---------------------------------------------------------- | :-------- |
| [localhost:4000](http://localhost:4000)                     | /         |
| [localhost:4000/students/](http://localhost:4000/students/) | students/ |
| [localhost:4000/trainers/](http://localhost:4000/trainers/) | trainers/ |

<br>

Class repo: [David Oster myapp](https://github.com/davidoster/myapp)

<br>

<br>

<br>

<br>

<br>

<br>

🤿

enjoy
