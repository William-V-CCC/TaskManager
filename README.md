Open the terminal built into visual studio code using the button in the top right. (should be the 3rd button in the very top right looking left to right)

Run

npm install

then if theres anything not installed
do

npm i "the name of item needing installed"

Example being

npm install express
npm install swagger-jsdoc


once the installs are done in the terminal type

deno task dev

and press return

you will see 2 things running

one is the swagger (where you can see what the routes are and test them/use them)
the other will be the endpoint of the site where a frontend can call it from

Swagger runs at:

http://localhost:3000/docs

this is where you can test all routes without needing something like postman

these are the main routes

GET /tasks -> get all tasks
GET /tasks/:id -> get one task by id
POST /tasks -> create a new task
PUT /tasks/:id/toggle -> switches completed from true to false or false to true


the database file is included in the project
tasks.db

it already has the table setup and some example data

Project Structure (basic)
routes/        -> endpoints  
controllers/   -> logic  
main.ts        -> starts server + swagger  
database.ts    -> sqlite setup  

uses sqlite so no setup needed for database
everything runs locally