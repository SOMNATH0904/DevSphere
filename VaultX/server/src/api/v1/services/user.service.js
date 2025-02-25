import {User} from '../../common/models/index.js';
import {
  ApiError,
  getAvatarName,
  paginateQuery,
} from '../../common/utils/index.js';

const getAllUsers = async (filter = '', page, limit) => {
  // This regex matches each word in a name starting with "filter".
  const regex = new RegExp(`\\b${filter}`, 'i');

  const usersQuery = User.find({name: {$regex: regex}});
  const result = await paginateQuery(usersQuery, page, limit);

  const userList = result.data.map(user => ({
    name: user.name,
    email: user.email,
    _id: user._id,
  }));

  return {users: userList, pagination: result.pagination};
};

const getUserById = async userId => {
  return User.findById(userId).select('-password -refreshToken -__v');
};

const updateCurrentUser = async (userId, userData) => {
  const {name, oldPassword, newPassword} = userData;

  const user = await User.findById(userId);

  if (oldPassword && newPassword) {
    if (user.signInType !== 'Email-Password') {
      // If the user is registered with a method other than Email-Password, changing the password is not applicable
      throw new ApiError(
        400,
        `Changing the password is not applicable for accounts registered with ${user.signInType}.`
      );
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
      throw new ApiError(400, 'Invalid old password');
    }

    user.password = newPassword;
  }

  if (name) {
    user.name = name;
    if (user.signInType === 'Email-Password') {
      user.avatar = `https://ui-avatars.com/api/?name=${getAvatarName(
        name
      )}&size=250&background=4d2be2&color=ffffff`;
    }
  }

  await user.save();

  // Return updated user details
  return User.findById(user._id).select('-password -refreshToken -__v');
};

export const userService = {
  getUsers: getAllUsers,
  getUser: getUserById,
  updateUser: updateCurrentUser,
};
