const express = require('express');
const router = express.Router();
const {
	getAllHotels,
	getHotelById,
	createNewHotel,
	updateHotelById,
	deleteHotelById,
} = require("../controllers/hotelController");

router.get("/", getAllHotels);

router.get("/:hotelId", getHotelById);

router.post("/", createNewHotel);

router.put("/:hotelId", updateHotelById);

router.delete("/:hotelId", deleteHotelById);

module.exports = router;