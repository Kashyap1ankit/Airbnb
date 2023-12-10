if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");

const DB_URL = process.env.ATLAS_URL;
const SECRET = process.env.SECRET;
const port = 8080;

// // Monog session store -- While production

// const store = MongoStore.create({
//   mongoUrl: DB_URL,
//   crypto: {
//     secret: SECRET,
//   },
//   touchAfter: 24 * 3600, // time period in seconds
// });

// store.on("error", () => {
//   console.log("error in database", err);
// });

//Session options

const sessionOptions = {
  // store,
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//Using the express-session
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

//Passport

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routers

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//Method Override

app.use(methodOverride("_method"));

//Connecting to mongoDB

main()
  .then((res) => console.log("Database connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
}

//View Folder - ejs

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// use ejs-locals for all ejs templates:

app.engine("ejs", ejsMate);

//For fetching data for post request

app.use(express.urlencoded({ extended: true }));

//Serving static file

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.redirect("/listings");
});

//Using the flash-connect package

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//Listing Routes

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//Error for no routes

app.all("*", (req, res) => {
  res.render("listings/error.ejs");
});

//Edit Handling mw

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  req.flash("error", `${message}`);
  res.redirect("/listings");
  next();
});

app.listen(port, (req, res) => {
  console.log("Server started");
});
