
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app=express()
const nodemon=require("nodemon")
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(nodemon())