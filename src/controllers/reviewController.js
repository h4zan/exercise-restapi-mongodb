const Review = require('../models/review')
const { NotFoundError, BadRequestError } = require('../utils/errors')

exports.getAllReviews = async (req, res, next) => {
	const limit = Number(req.query?.limit || 10)
	const offset = Number(req.query?.offset || 0)
	const Review = await Review.find().limit(limit).skip(offset)
    const totalReviewsInDatabase = await Review.countDocuments()

    return res.json({
		data: Review, // Send projects result
		meta: {
			// meta information about request
			total: totalReviewsInDatabase, // Total num projects available in db
			limit: limit, // Num of projects asked for
			offset: offset, // Num or projects asked to skip
			count: hot.length, // Num of projects sent back
		},
	})
}

exports.getReviewById = async (req, res, next) => {
	// Get our project id (put in local variable)
	const reviewId = req.params.reviewId

	// Find project with that id
	const review = await review.findById(reviewId)

	// IF(no project) return 404
	if (!review) throw new NotFoundError('This review does not exist')

	// respond with project data (200 OK)
	return res.json(review)
}

exports.createNewReview = async (req, res, next) => {
	// Get data from req.body and place in local variables
	const name = req.body.name
	const description = req.body.description

	// If (no name || name is empty string) respond bad request
	if (!name) throw new BadRequestError('You must provide a name')

	// Create project
	const newReview = await Review.create({
		name: name,
		description: description,
	})

	// Respond
	// prettier-ignore
	return res
    // Add Location header to response
    // Location header = URI pointing to endpoint where user can get new project
    .setHeader(
      'Location', 
      `http://localhost:${process.env.PORT}/api/v1/projects/${newReview._id}`
    )
    .status(201)
    .json(newReview)
}

exports.updateReviewById = async (req, res, next) => {
	// Place project id in local variable
	const reviewId = req.params.reviewId

	// Place name and description from req.body in local variables
	const { name, description } = req.body

	// If no name && description respond with Bad Request
	if (!name && !description) throw new BadRequestError('You must provide a name or a description to update...')

	// Get project
	const reviewToUpdate = await Review.findById(reviewId)

	// If (no project) respond with Not Found
	if (!reviewToUpdate) throw new NotFoundError('This review does not exist')

	// Update project
	if (name) reviewToUpdate.name = name
	if (description) reviewToUpdate.description = description
	const updatedReview = await reviewToUpdate.save()

	// Craft response (return updated project)
	return res.json(updatedReview)
}

exports.deleteReviewById = async (req, res, next) => {
	// Get project id and place in local variable
	const reviewId = req.params.reviewId
	// Check if project exists
	const reviewToDelete = await Review.findById(reviewId)
	// IF (no project) return Not Found
	if (!reviewToDelete) throw new NotFoundError('This review does not exist')

	// Delete project
	await reviewToDelete.delete()

	// Craft our response
	return res.sendStatus(204)
}