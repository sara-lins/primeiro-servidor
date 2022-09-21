import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
const port = 3000;
let users = [];

app.get("/users", (req, res) => {
  res.json(users);
  return res.send(users);
});

app.post("/users", (req, res) => {
  const { email, name } = req.body;
  const userAlreadyExists = users.find((user) => user.email === email);

  if (userAlreadyExists) {
    return res.status(400).json({
      error: "This email address is already being used",
    });
  }

  const newUser = {
    id: uuidv4(),
    email,
    name,
  };

  users.push(newUser);

  return res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
