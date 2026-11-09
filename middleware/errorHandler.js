function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: 'Endpoint nie istnieje'
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
