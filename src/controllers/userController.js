const User = require("../models/user")
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.getAllUsers = async (req, res, next) => {
    const limit = Number(req.query?.limit || 5);
    const offset = Number(req.query?.offset || 0);
    const users = await Todo.find().limit(limit).skip(offset);
    const totalUsersInDataBase = await User.countDocuments();
    return res.json({
      data: users,
      meta: {
        total: totalUsersInDataBase,
        limit: limit,
        offset: offset,
        count: users.length,
      },
    });
  };
  exports.getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("This user does not exist");
    return res.json(user);
  };
  
  exports.createNewUser = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
  
    if (!name) throw new BadRequestError("You must provide a name");
  
    const newUser = await User.create({
      name: name,
      description: description,
    });
    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/users/${newUser._id}`
      )
      .status(201)
      .json(newUser);
  };
  exports.updateUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const { name, description } = req.body;
  
    if (!name && !description)
      throw new BadRequestError(
        "You must provide a name or description to update..."
      );
    const userToUpdate = await User.findById(userId);
  
    if (!userToUpdate) throw new NotFoundError("This todo does not exist");
  
    if (name) userToUpdate.name = name;
    if (description) userToUpdate.description = description;
    const updatedUser = await userToUpdate.save();
  
    return res.json(updatedUser);
  };
  
  exports.deleteUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const userToDelete = await User.findById(userId);
  
    if (!userToDelete) throw new NotFoundError("This user does not exist");
  
    await userToDelete.delete();
  
    return res.sendStatus(204);
  };