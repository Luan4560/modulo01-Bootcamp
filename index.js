// Criando CRUD

const express = require("express");

const server = express();
server.use(express.json());

const users = ["Luan", "Robson", "Josué"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }
  req.user = user;

  return next();
}

server.get("/users", (req, res) => {
  // Listando os usuários
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  // Listando apenas usuário passado no index

  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  // Criando usuário
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  // Atualizando usuário
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name; // sobrepondo informação

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  // Deteletando usuário
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});
server.listen(3000);
