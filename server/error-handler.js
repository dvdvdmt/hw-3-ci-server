function errorHandler(err, req, res, next) {
  if (err) {
    if (err.isAxiosError && err.response) {
      console.error(err.response);
      const {status, data, statusText} = err.response;
      res.status(status);
      if (data) {
        res.send({message: data.title, formError: data.errors});
      } else {
        res.send({message: statusText});
      }
    } else {
      console.error(err.stack);
      res.status(500).send({message: err.message});
    }
  } else {
    next();
  }
}

exports.errorHandler = errorHandler;
