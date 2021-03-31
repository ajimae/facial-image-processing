const { Router } = require('express');
const { process } = require("../utils/process");
const validate = require('../middleware/validator');
const { uploadSingle } = require("../middleware/upload");

const Upload = require('../controller/Upload');

const router = Router();
const uploadController = new Upload({ process });

router.post('/upload', uploadSingle.single('file'), validate, uploadController.upload.bind(uploadController))

module.exports = router;
