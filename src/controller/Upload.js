class Upload {
  constructor({ process }) {
    this.process = process;
  }

  async upload(req, res) {
    const { fullImgData } = req.body;
    const { result, imageData } = await this.process(req.file);
    return res.status(200).json({
      success: true,
      message: 'image processing complete',
      data: fullImgData == 'true' ? result : imageData,
    });
  }
}

module.exports = Upload
