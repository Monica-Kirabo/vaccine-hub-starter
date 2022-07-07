
const express = require("express");
const morgan = require("morgan");
const auth=require("./routes/auth")
const cors = require("cors");
const app=express()
const nodemon=require("nodemon")

const {BadReqeustError, NotFoundError}=require("./utils/errors")
const {PORT}=require("../config")
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(nodemon())
app.use("/auth",auth)
app.use((err,res,next)=>{
    return next(new NotFoundError)
})

//const PORT=process.env.PORT||3001

app.listen(PORT,()=>{
    console.log(`🚀 Server listening on port ` + port)
})