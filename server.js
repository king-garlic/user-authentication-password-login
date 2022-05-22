console.log("♥♥♥♥♥♥♥♥ port  3000 server start....", "");

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

app.listen(3000);
app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    console.log("♥♥♥♥♥♥♥♥ port  3000 server start....", "post");
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log(salt);
    // console.log(hashedPassword);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
    console.log("user", user);
    console.log("users", users);
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});
