const errorHandler = (err, req, res, next) => {
  //status code is the one passed in, or 500 for server error
  const statusCode = res.statusCode || 500;
  //set the status as the code above
  res.status(statusCode);

  //return an error message, and our tech stack if in dev environment
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });

  //at the end of middleware, have to do next()
  next();
};

module.exports = { errorHandler };
