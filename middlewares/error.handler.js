function logErrors (err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

function boomErrorHandler(err, req, res, next) {
  console.log('Boom Handler')
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

function ormErrorHandler(err, req, res, next) {
  console.log(err, 'errorHandler');
    if (err instanceof ValidationError) {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
      });
    }
    next(err);
  }

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler};