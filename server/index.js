const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/index");
const cors = require("cors");
const notFound = require('./middleware/not-found')
const asyncWrapper = require("./middleware/async");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

// middleware
app.use(
  cors({
    origin: "*", // or '*' to allow all origins
  })
);
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound); // middleware
app.use(errorHandlerMiddleware); // middleware

// app.get('/api/v1/tasks')           - get all the tasks
// app.post('/api/v1/tasks')          - create a new task
// app.get('/api/v1/tasks/:id')       - get a single task
// app.patch('/api/v1/tasks/:id')     - update a task
// app.delete('/api/v1/tasks/:id')    - delete a task

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

start();
