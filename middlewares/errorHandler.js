const errorHandler = (err, req, res, next) => {
  let message = "Internal Server Error";
  let status = 500;

  if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
    status = 401
    message = "Invalid token"
  } if(err.name === "NotFound") {
    status = 404
    message = "Movie not found"
  } else if(err.name === "Forbidden") {
    status = 403
    message = "You don't have access"
  } else if (err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
    status = 400
    message = err.errors[0].message
  } else if(err.name === 'EmailRequired') {
    status = 400
    message = "Email is required"
  } else if(err.name === 'PasswordRequired') {
    status = 400
    message = "Password is required"
  } else if(err.name === "Unauthenticated") {
    status = 401
    message = "Invalid Email or Password"
  } 
  // else if(err.name === "AxiosError") {
  //   status = 401
  //   message = err.response.data.status_message
  // }

  res.status(status).json({
    message,
  });
}

module.exports = errorHandler