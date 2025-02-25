import {ApiError, ApiResponse, asyncHandler} from '../../common/utils/index.js';
import {userService} from '../services/index.js';
import {userValidator} from '../validators/index.js';

const {ValidateUpdate} = userValidator;

const getAllUsers = asyncHandler(async (req, res) => {
  const {filter, page, limit} = req.query;

  const {users, pagination} = await userService.getUsers(filter, page, limit);

  return res.json(
    new ApiResponse(200, {users, pagination}, 'Users fetched successfully')
  );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = await userService.getUser(req.user._id);

  return res.json(
    new ApiResponse(200, {currentUser}, 'User fetched successfully')
  );
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const {error} = ValidateUpdate(req.body);
  if (error) throw new ApiError(400, error.issues[0].message);

  const updatedUser = await userService.updateUser(req.user._id, req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(201, {user: updatedUser}, 'User updated successfully')
    );
});

export const userController = {
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
};
