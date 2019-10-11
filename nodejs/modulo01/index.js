const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Karlos", "email": "karlos_kelvin@hotmail.com" }

server.use((request, response, next) => {
  console.time("Request");
  console.log(`Método: ${request.method}; URL: ${request.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(request, response, next) {
  if (!request.body.name) {
    return response.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(request, response, next) {
  const user = users[request.params.index];

  if (!user) {
    return response.status(400).json({ error: "User does not exists!" });
  }

  request.user = user;

  return next();
}

const users = ["Karlos", "Kelvin", "Robson"];

server.get("/users", (request, response) => {
  return response.json(users);
});

server.get("/users/:index", checkUserInArray, (request, response) => {
  response.json(request.user);
});

server.post("/users", checkUserExists, (request, response) => {
  const { name } = request.body;

  users.push(name);

  response.json(users);
});

server.put(
  "/users/:index",
  checkUserExists,
  checkUserInArray,
  (request, response) => {
    const { index } = request.params;
    const { name } = request.body;

    users[index] = name;

    response.json(users);
  }
);

server.delete("/users/:index", checkUserInArray, (request, response) => {
  const { index } = request.params;

  users.slice(index, 1);

  response.send();
});

server.listen(3000);
