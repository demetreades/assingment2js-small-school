# Express CRUD small school

<br>

PORT: `5000`

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

    npm i

<br>

## 3. Generate database

Fill your local mysql credentials in `/database/credentials.js`

       npm run DATA:import

Run `DATA:import` script to generate, use schema, create and populate tables.

<br>

## 4. Start server

    npm start

<br>

## 5. Navigation

List of current active endpoints:

<br>

| URLs                                                                              | Endpoints            |
| :-------------------------------------------------------------------------------- | :------------------- |
| [localhost:5000](http://localhost:5000)                                           | /                    |
| [localhost:5000/students/](http://localhost:5000/students/)                       | students/            |
| [localhost:5000/students/update/](http://localhost:5000/students/update/)         | students/update      |
| [localhost:5000/students/update/:id/](http://localhost:5000/students/update/:id/) | students/update/:id/ |
| [localhost:5000/students/delete/:id/](http://localhost:5000/students/delete/:id/) | students/delete/:id/ |
|                                                                                   |                      |
| [localhost:5000/trainers/](http://localhost:5000/trainers/)                       | trainers/            |
| [localhost:5000/trainer/update/](http://localhost:5000/trainer/update/)           | trainer/update/      |
| [localhost:5000/trainer/update/:id/](http://localhost:5000/trainer/update/:id/)   | trainer/update/:id/  |
| [localhost:5000/trainer/delete/:id/](http://localhost:5000/trainer/delete/:id/)   | trainer/delete/:id/  |

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
