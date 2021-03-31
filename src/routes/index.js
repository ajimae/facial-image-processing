const { Router } = require('express')

const upload = require('./upload')

const router = Router();

// home route
router.get('/', (_, res) => {
  return res.status(200).json({
    success: true,
    message: 'welcome to softmode image processing api',
  });
});

// add your router function here
router.use('/', upload);

module.exports = router;