const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", async (req, res) => {
  const accounts = await db("accounts");
  res.json(accounts);
});

server.get("/api/accounts/:id", async (req, res) => {
  const account = await db("accounts").where("id", req.params.id);
  res.json(account);
});

server.post("/api/accounts", async (req, res) => {
  const payload = { name: req.body.name, budget: req.body.budget };
  const newAccount = await db.insert(payload).into("accounts");
  res.status(201).json(newAccount);
});

server.put("/api/accounts/:id", async (req, res) => {
  const payload = { name: req.body.name, budget: req.body.budget };
  const updatedAccount = await db("accounts")
    .where("id", req.params.id)
    .update(payload);

  res.json(updatedAccount);
});

server.delete("/api/accounts/:id", async (req, res) => {
  await db("accounts").where("id", req.params.id).del();
  res.status(204).end();
});

module.exports = server;
