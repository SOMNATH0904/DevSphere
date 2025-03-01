const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const bodyParser = require("body-parser");
require("dotenv").config();
const db=require('./db');
const app = express();
const User = require("./models/User");
const Donate = require("./models/donate");
const UserRoute = require("./routes/User");
const DonateRoute = require("./routes/Donate");
const Request = require("./models/Request");
const RequestRoute = require("./routes/Request");
const Message=require("./models/message");
const MessageRoute=require("./routes/Message");
const cors = require("cors");
const { compareSync } = require("bcrypt");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "process.env.JWT_SECRET";
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: jwt_payload.identifier}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use("/auth", UserRoute);
app.use("/donate", DonateRoute);
app.use("/request", RequestRoute);
app.use("/message",MessageRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
