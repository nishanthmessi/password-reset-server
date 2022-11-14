const { errorResponseBody } = require('../utils/responsebody')

const validateUpdateUserRequest = (req, res, next) => {
  if(!(req.body.userRole || req.body.userStatus)) {
    errorResponseBody.err = 'Please send atleast one of the following'
    return res.status(400).json(errorResponseBody)
  }
  next()
}

module.exports = {
  validateUpdateUserRequest,
}