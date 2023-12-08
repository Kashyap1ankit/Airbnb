const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utlis/wrapAsync");
const ExpressError = require("../utlis/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

//Joi Validators

const listingValidator = function (req, res, next) {
  const result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error.details[0].message);
  } else {
    next();
  }
};

//Index routes

router
  .route("/")
  .get(listingController.index)
  .post(
    upload.single("listing[image]"),
    listingValidator,
    wrapAsync(listingController.createListing)
  );

//Create Route--Form

router.get("/new", isLoggedIn, listingController.renderNewListing);

//Sorting

router.get("/sort/:category", listingController.sortListing);

//Seach Functionality

router.get("/search/:name", async (req, res) => {
  let { name } = req.params;
  const listing = await Listing.find({ title: name });
  res.render("listings/index.ejs", { data: listing });
});

//Create Route -- Add

//Show Route--Update Route--Delete route

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isOwner,
    upload.single("listing[image]"),
    listingValidator,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route--Form

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
