const Hotel = require('../models/hotel')
const { NotFoundError, BadRequestError } = require('../utils/errors')

exports.getAllHotels = async (req, res, next) => {

	const limit = Number(req.query?.limit || 10)

	const offset = Number(req.query?.offset || 0)

	const hotels = await Hotel.find().limit(limit).skip(offset)

    const totalHotelsInDatabase = await Hotel.countDocuments()

    return res.json({
		data: hotels, 
		meta: {
			
			total: totalHotelsInDatabase, 
			limit: limit, 
			offset: offset, 
			count: hotels.length, 
		},
	})
}

exports.getHotelById = async (req, res, next) => {
	const hotelId = req.params.hotelId

	const hotel = await Hotel.findById(hotelId)

	if (!hotel) throw new NotFoundError('This hotel does not exist')

	return res.json(hotel)
}

exports.createNewHotel= async (req, res, next) => {
	const name = req.body.name
	const description = req.body.description

	if (!name) throw new BadRequestError('You must provide a name')

	const newHotel = await Hotel.create({
		name: name,
		description: description,
	})

	return res

    .setHeader(
      'Location', 
      `http://localhost:${process.env.PORT}/api/v1/projects/${newHotel._id}`
    )
    .status(201)
    .json(newHotel)
}

exports.updateHotelById = async (req, res, next) => {

    const hotelId = req.params.hotelId

	const { name, description } = req.body

	if (!name && !description) throw new BadRequestError('You must provide a name or a description to update...')

	const hotelToUpdate = await Hotel.findById(hotelId)

	if (!hotelToUpdate) throw new NotFoundError('This hotel does not exist')

	if (name) projectToUpdate.name = name
	if (description) projectToUpdate.description = description
	const updatedProject = await projectToUpdate.save()

	return res.json(updatedProject)
}

exports.deleteHotelById = async (req, res, next) => {
	const hotelId = req.params.projectId

    const hotelToDelete = await Project.findById(hotelId)

    if (!hotelToDelete) throw new NotFoundError('This hotel does not exist')

	await hotelToDelete.delete()

	return res.sendStatus(204)
}