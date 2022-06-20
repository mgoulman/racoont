const UserModel = require("../model/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfile = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/jpeg" &&
      req.file.detectedMimeType !== "image/png"
    )
      throw Error("invalid file");

      if (req.file.size > 500000) 
      throw Error("max size reached")
  } catch (err) {
      const errors = uploadErrors(err)
      return res.status(201).json({errors})
  }

  const fileName = req.body.name + ".jpg";
  console.log("name ====> : ", fileName);

  await pipeline(
      req.file.stream,
      fs.createWriteStream(
          `${__dirname}/../client/public/upload/profile/${fileName}`
      )
  )
};
