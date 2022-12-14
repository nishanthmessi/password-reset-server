const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { USER_ROLE, USER_STATUS } = require('../utils/constants')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  userRole: {
    type: String,
    required: true,
    enum: {
      values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
      message: "Invalid user role given"
    },
    default: USER_STATUS.approved
  }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function (plainPassword) {
  const currentUser = this
  const compare = await bcrypt.compare(plainPassword, currentUser.password)
  return compare
}

const User = mongoose.model('User', userSchema)
module.exports = User