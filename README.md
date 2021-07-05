class repo: [https://github.com/davidoster/myapp](https://github.com/davidoster/myapp)
# Express CRUD small school project

PORT: `4000`


Generated with [express-init](https://github.com/demetreades/express-init)

<br>

![sample](./public/img/diagram.png)

<br>

## 1. Clone repo and cd into `/myapp` folder

`pwd` for current path

`git clone https://github.com/demetreades/myapp.git`

`dir` or `ls` for files list

`cd myapp` if you are not already into

<br>

## 2. Install dependencies

If you cloned the repo you need to install dependencies first as described in the `package.json` 

`npm install`

<br>

## 4. Generate database

_Still under construction_

Firstly insert your `MySQL` credentials into `node ./database/init.js` and then run it: to create , use schema, create and populate tables. 

Connection hangs so you need manually to abort via `CTRL+C` after completion unfortunately. 

_It will be fixed in the future._ 

<br>

You also need to change credentianls at `/services/connection.js`. for the main connection with the newly created database.

<br>

## 3. Run app

Run `npm start` 

The app listening at port: `4000`

<br>

## 4. Navigate to:


List of current active urls:

|URLs                                                       |Endpoints       |
|:----------------------------------------------------------|:---------------|
|[localhost:4000](http://localhost:4000)                    |        /       |
|[localhost:4000/students/](http://localhost:4000/students/)|    students/   | 
|[localhost:4000/trainers/](http://localhost:4000/trainers/)|    trainers/   | 

<br>

<br>

<br>

<br>

<br>

🤿 

enjoy
