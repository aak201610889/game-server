const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const fs=require("fs")
app.use("/static", express.static(path.resolve("./uploads")));
console.log(path.resolve("./uploads"))
connectDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/gamesRoutes"));



// fs.rm('./uploads/aak.png',(err,data)=>{
//   if(err){console.log(err)}
//   else{console.log('delete')}
// })

app.use("/user", require("./routes/userRoutes"));

const port = process.env.port || 5500;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
