const App = require('./src/app');
const { load } = require("./lib/faceRecognition");

const app = new App().config();

app.use((err, req, res, next) => {
  if (err.message.includes('too large')) {
    return res.status(500).json({
      success: false,
      message: err.message || 'uploaded file is too large',
      details: 'upload file size limit for free account is 2.0MB',
      error: {
        cause: 'a file with size greater than upload limit for free tier accounts was uploaded'
      }
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'internal server error',
    error: {
      cause: 'an internal server error occurred, please try again later'
    }
  });
});

app.on('error', function(error) {
  console.log("-->", error);
});

app.on('listening', function(listen) {
  console.log("".green, listen);
});

console.log('\x1b[36m%s\x1b[0m', "server listening on port " + app.get('port'));
app.listen(app.get('port'), load);
