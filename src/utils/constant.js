const path = require('path');
const crypto = require('crypto');

module.exports = {
  MODELS_URL: path.join(__dirname, '..', '..', 'lib', 'models'),
  TEMP_IMG_NAME: (file) => `${crypto.randomBytes(16).toString('hex')}.${file.mimetype.split('/')[1]}`,
  TEMP_UPLOAD_URL: path.join(__dirname, '..', '..', 'tmp'),
}
