const express = require("express");
const morgan = require("morgan");
const auth = require("./routes/auth");
const cors = require("cors");
const app = express();
const nodemon = require("nodemon");

const { BadReqeustError, NotFoundError } = require("./utils/errors");
const { PORT } = require("./config");
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
// app.use(nodemon());
app.use("/auth", auth);
app.use((req, res, next) => {
  return next(new NotFoundError());
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  const error = { status, message };

  return res.status(status).json({ error: { message, status } });
});

const port = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ` + port);
});
