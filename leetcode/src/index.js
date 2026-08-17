const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});
const main = require("../config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/userAuth.route");
const redisClient=require("../config/redis");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/user", authRouter);

console.log("PORT FROM ENV:", process.env.PORT);

app.get("/", (req, res) => {
    res.send("hhey");
});


const initializeConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()]);//connects both redis and db
        console.log("Connection Successfull!!");
         app.listen(process.env.PORT, () => {
         console.log("listening at:"+ process.env.PORT);
     });
    } catch (error) { 
         console.log("Error:"+error);
    }
}
initializeConnection();

// main()
// .then(async ()=>{
//     app.listen(process.env.PORT, () => {
//         console.log("listening at:", process.env.PORT);
//     });
// })
// .catch(err=>console.log("Error Occured"+err));