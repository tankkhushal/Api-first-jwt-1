const express = require('express');

const port = 8001;
const app = express();
const path = require('path')
const db = require ("./config/mongoose")
const passport = require("passport")
const jwtpassport = require("./config/passport_jwt_strategy");
const session = require("express-session");


app.use(express.urlencoded());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use(session({
    name:"khushal",
    secret:'rnw',
    resave : false,
    SaveUninitialized :false,
    cookie :{
        MaxAge : 1000*60*60
    }
}))

app.use(passport.initialize())
app.use(passport.session());


app.use("/", require('./router'));

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
        return;
    }
    console.log("Server is running on port " + port);
});
