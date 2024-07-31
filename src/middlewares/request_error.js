function request_error(err, req, res, next) {
  let errorMessage, statusCode;

  if (err.name == 'SequelizeUniqueConstraintError') {
    errorMessage = 'Os dados informados coincidem com dados já cadastrados.';
    statusCode = 409;
  } else if (err.name == 'SequelizeValidationError') {
    errorMessage = err.message.replace('Validation error: ', '');
    statusCode = 400;
  } else {
    errorMessage = 'Um erro ocorreu ao realizar a operação requisitada.';
    statusCode = 500;
  }

  console.error(err, err.stack);

  res.status(statusCode).json({
    message: errorMessage,
    path: req.path,
  });
}

export default request_error;
