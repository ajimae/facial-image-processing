/**
 * this function takes in an image file
 * and send it to the faceapi image processor
 * for processing
 */
const { identifyFace } = require('../../lib/faceRecognition');

async function process(file) {
  const result = await identifyFace(file);
  const expression = Object.keys(result.expressions).sort(function(a, b) { return result.expressions[b] - result.expressions[a] })[0];

  result.originalFileData = file;
  result.imageData = {
    age: result.age.toFixed(2),
    score: result.detection._score,
    gender: {
      genger: result.gender,
      probability: result.genderProbability,
    },
    expression: { expression, probability: result.expressions[expression] }
  };

  return { result, imageData: result.imageData };
}

module.exports = { process }
