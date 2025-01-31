const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const DBConnect = require("./db/db");
const app = express();
const bankRoutes = require("./routes/bank.route");
const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");
const port =process.env.PORT || 3000 ;

DBConnect() ;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.use("/bank",bankRoutes);
app.use("/users",userRoutes);
app.use("/admin",adminRoutes);

app.listen(port,()=>{
    console.log(`server is listening on port ${port}.`);
})