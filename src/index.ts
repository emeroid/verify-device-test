// src/index.ts
const express = require('express');
const { ensureConnection } = require('./utils/db');
const registration = require("./auth/register");
const profile = require("./auth/dashboard");
const loginUser = require("./auth/login");
const auth = require("./middleware/jwt")

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: any, res: any) => {
  res.send('Hello, TypeScript with Express!');
}); 

app.post("/api/register", registration);
app.post("/api/login", loginUser);
app.get("/api/profile", auth, profile);

ensureConnection().then(async (db:any) => {
})
.catch((err: any) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



