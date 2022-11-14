const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const routes = (app) => {
  app.post('/api/v1/auth/signup',
    authMiddleware.validateSignupReq,
    authController.signup
  )

  app.post('/api/v1/auth/signin',
    authMiddleware.validateSigninReq,
    authController.signin
  )

  app.patch('/api/v1/auth/reset',
    authMiddleware.isAuthenticated,
    authMiddleware.validateResetPasswordReq,
    authController.resetPassword
  )
}

module.exports = routes