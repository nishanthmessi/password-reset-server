const User = require('../models/user.model')
const { USER_ROLE, USER_STATUS, STATUS } = require('../utils/constants')

const createUser = async (data) => {
  try {
    // if(!data.userRole || data.userRole == USER_ROLE.customer) {
    //   if(data.userStatus && data.userStatus != USER_STATUS.approved) {
    //     throw {
    //       err: 'We cannot set any other status for the user',
    //       code: STATUS.BAD_REQUEST
    //     }
    //   }
    // }
    // if(data.userRole && data.userRole != USER_ROLE.customer) {
    //   data.userStatus = USER_STATUS.pending;
    // }

    const response = await User.create(data)
    console.log(response);
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({
      email: email
    })
    if(!response) {
      throw {
        err: 'User not found for given email',
        code: STATUS.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getUserById = async (id) => {
  try {
      const user = await User.findById(id);
      if(!user) {
          throw {err: "No user found for the given id", code: 404};
      }
      return user;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
}
