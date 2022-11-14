const USER_STATUS = {
  approved: "APPROVED",
  pending: "PENDING",
  rejected: "REJECTED"
};

const USER_ROLE = {
  customer: "CUSTOMER",
  admin: "ADMIN",
  client: "CLIENT"
}

const STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORISED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  GONE: 410,
}

module.exports = {
  USER_STATUS,
  USER_ROLE,
  STATUS: STATUS_CODES
}