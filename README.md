# COSC2101 - Netflix R
- An online movie renting system using ReactJS, ExpressJS, NodeJS, MongoDB

## How to run on localhost
### Backend
1. Change directory to backend folder
```bash
$ cd backend
```
2. Install all packages
```bash
$ npm install
```
3. Start the server at http://localhost:4000
```bash
$ npm run dev
```

### Frontend
1. Make sure you've already started the Backend
2. Start Frontend 
```bash
$ cd frontend
```
3. Install all packages
```bash
$ npm install
```
4. Start the Frontend app
```bash
$ npm run dev
```
5. Open Google Chrome and visit http://localhost:3000

## How to run by Docker
1. Make sure you install and start Docker on your machine
2. At root directory, execute:
```bash
docker-compose up -d
```
3. Open Google Chrome and visit http://localhost:3000

## How to run Unit Tests
### Backend
1. Change directory to backend folder
```bash
$ cd backend
```
2. Install all packages
```bash
$ npm install
```
3. Start testing all unit tests
```bash
$ npm test
```

### Frontend
1. Start a Backend
```bash
cd backend
npm install
npm run dev
```
3. Open new Terminal app and Don't stop the backend server
```bash
$ cd frontend
```
2. Install all packages
```bash
$ npm install
```
3. Start testing all unit tests
```bash
$ npm test
```

### How to connect to MongoDB and preview data
1. Download Mongo Compass app at https://www.mongodb.com/try/download/compass
2. Open and connect with mongodb+srv://admin:abcd12345@moviedatabase.s44w8.mongodb.net/netflix
3. Select Netflix database in the left panel and preview the data.