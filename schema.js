const Joi = require("joi");
const Review = require("./models/review");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().min(3).max(30),
    description: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
    }),
    price: Joi.number().required().min(1),
    location: Joi.string().required(),
    country: Joi.string().required(),
    field: Joi.string().required(),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    description: Joi.string().required(),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
