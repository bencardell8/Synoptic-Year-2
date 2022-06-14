# Synoptic-Year-2

## Bond Market For Tidal Power Generation 

## Requirements

### PostgresSQL
### Table
```
CREATE TABLE users
(id BIGSERIAL PRIMARY KEY NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
dollars FLOAT,
interest FLOAT,
UNIQUE (email));
```


### Node.JS Modules Used
- pg
- nodemon
- express
- ejs
- passport 
- passport-local
- express-session
- express-flash
- dotenv


### Install all npm modules with the following command:
```
npm i pg nodemon express ejs passport passport-local express-session express-flash dotenv
```
## Running The Project

1. Open a terminal in directory: ```Synoptic-Year-2```
2. Run the following command: ```npm run devStart```
4. Open a browser and navigate to: ```http://localhost:3000```
