function validate(req, res, next) {
  if (req.fileValidationError) {
    return res.status(400).json({
      success: false,
      message: 'file validation error',
      details: req.fileValidationError,
      error: {
        cause: 'an unprocessible file type was uploaded',
      },
    })
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'the uploaded file is invalid',
      error: {
        cause: 'the uploaded file is either invalid or empty',
      },
    })
  }
  next();
}

module.exports = validate;
