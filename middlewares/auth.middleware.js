const jwt  = require('jsonwebtoken')
const { errorResponseBody } = require('../utils/responsebody')
const userService = require('../services/user.service')
const { USER_ROLE, STATUS } = require('../utils/constants')

const validateSignupReq = async (req, res, next) => {
  // validate name of the user
  if(!req.body.name) {
    errorResponseBody.err = 'Name of user not present in request'
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
  }

  // validate email of the user
  if(!req.body.email) {
    errorResponseBody.err = "Email of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate password present of the user
  if(!req.body.password) {
      errorResponseBody.err = "Password of the user not present in the request";
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // request is valid
  next();
}

const validateSigninReq = async (req, res, next) => {
  // validate user email
  if(!req.body.email) {
    errorResponseBody.err = "No email provided for sign in";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate user password 
  if(!req.body.password) {
    errorResponseBody.err = "No password provided for sign in";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // request is valid
  next();
}

const isAuthenticated = async (req, res, next) => {
  try {
      const token = req.headers["x-access-token"];
      if(!token) {
        errorResponseBody.err = "No token provided";
        return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
      }
      const response = jwt.verify(token, process.env.JWT_SECRET);
      if(!response) {
        errorResponseBody.err = "Token not verified";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
      }
      const user = await userService.getUserById(response.id);
      req.user = user.id;
      next();
  } catch (error) {
      if(error.name == "JsonWebTokenError") {
        errorResponseBody.err = error.message;
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
      }
      if(error.code == STATUS.NOT_FOUND) {
        errorResponseBody.err = "User doesn't exist"
        return res.status(error.code).json(errorResponseBody);
      }
      errorResponseBody.err = error;
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const validateResetPasswordReq = (req, res, next) => {
  // validate old password
  if(!req.body.oldPassword) {
    errorResponseBody.err = "No old password provided";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate new password
  if(!req.body.newPassword) {
    errorResponseBody.err = "No new password provided";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  next()
}

module.exports = {
  validateSignupReq,
  validateSigninReq,
  isAuthenticated,
  validateResetPasswordReq
}