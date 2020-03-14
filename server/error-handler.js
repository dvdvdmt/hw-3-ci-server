function errorHandler(err, req, res, next) {
  if (err) {
    console.error(err.stack);
    res.status(500).send({message: err.message});
  } else {
    next();
  }
}

exports.errorHandler = errorHandler;
