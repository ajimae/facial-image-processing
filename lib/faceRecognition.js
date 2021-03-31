const canvas = require('canvas');
const faceapi = require('face-api.js');
const { monkeyPatchFaceApiEnv } = require('./monkeyPatch');
const { MODELS_URL, TEMP_UPLOAD_URL } = require('../src/utils/constant');

monkeyPatchFaceApiEnv();

let labeledFaceDescriptors = null;
let faceMatcher = null;

const load = () => Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL),
  faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_URL),
  faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_URL),
  faceapi.nets.ageGenderNet.loadFromDisk(MODELS_URL),
  faceapi.nets.faceExpressionNet.loadFromDisk(MODELS_URL)
]).then(() => {
  console.log('\x1b[36m%s\x1b[0m', "all faceapi drivers and engines loaded successfully");
}).catch(console.error);

const identifyFace = async ({ path, filename }) => {
  // load the image to be processed into faceapi image engine
  await loadImages(`${TEMP_UPLOAD_URL}/${filename}`);

  const image = await canvas.loadImage(path);
  const displaySize = { width: image.width, height: image.height };
  const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();

  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = faceMatcher.findBestMatch(resizedDetections.descriptor);

  return { ...results, ...resizedDetections };
}

// const start = async () => {
//   labeledFaceDescriptors = await loadLabeledImages();
//   faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
//   console.log(`Server listening on port ${PORT}`);
// }

// const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

// const loadLabeledImages = () => {
//   const labels = dirs(LABELED_IMAGES_URL)
//   return Promise.all(
//     labels.map(async label => {
//       const descriptions = []
//       for (let i = 1; i <= 2; i++) {
//         const img = await canvas.loadImage(`${LABELED_IMAGES_URL}/${label}/${i}.jpg`)
//         const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//         descriptions.push(detections.descriptor)
//       }

//       return new faceapi.LabeledFaceDescriptors(label, descriptions);
//     })
//   )
// }

const loadImages = async (img) => {
  labeledFaceDescriptors = await loadLabeledImages(img);
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
}

const loadLabeledImages = async (img) => {
  const descriptions = []
  const image = await canvas.loadImage(img)
  const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

  console.log(detections, ">>>")
  if (!detections) throw new Error('no face(s) could be found in the uploaded image');
  descriptions.push(detections.descriptor);

  return new faceapi.LabeledFaceDescriptors('tmp', descriptions);
}

module.exports = { load, identifyFace };