const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlis/wrapAsync");
const ExpressError = require("../utlis/ExpressError.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const { isAuthor, isLoggedIn } = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//Joi Validator

const reviewValidator = function (req, res, next) {
  const result = reviewSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error.details[0].message);
  } else {
    next();
  }
};

//Add Route

router.post(
  "/",
  isLoggedIn,
  reviewValidator,
  wrapAsync(reviewController.addReview)
);

//Handling the deletiion of reviews from show page

router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  reviewController.destroyRoute
);

module.exports = router;
