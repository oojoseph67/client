const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/index");
require("dotenv").config();

// middleware

app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 7000;

// the const below makes sure we are connected to the db before starting the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start()
