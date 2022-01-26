const UserModel = require("../model/user.model");
const ObjectID = require("mongoose").Types.ObjectID;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfos = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("id unknown:" + req.params.id);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("id unknown:" + err);
  }).select("-password");
};

module.exports.userUpdate = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("id unknown:" + req.params.id);
  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(400).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};
