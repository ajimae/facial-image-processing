const canvas = require('canvas');
const fetch = require('node-fetch');
const faceapi = require('face-api.js');

const monkeyPatchFaceApiEnv = () => {
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    faceapi.env.monkeyPatch({ fetch: fetch });
}

module.exports = { monkeyPatchFaceApiEnv };
