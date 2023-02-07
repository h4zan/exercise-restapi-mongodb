const express = require('express');
const router = express.Router();
const {
	getAllUsers,
	getUserById,
	createNewUser,
	updateUserById,
	deleteUserById,
} = require("../controllers/userController");


router.get("/", getAllUsers);

router.get("/:userId", getUserById);

router.post("/", createNewUser);

router.put("/:userId", updateUserById);

router.delete("/:userId", deleteUserById);

module.exports = router;