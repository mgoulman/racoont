const UserModel = require("../model/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  console.log('normal');
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("id unknown:" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).json({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Sucssefully deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.follow = (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idTofollow))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idTofollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(500), json(err);
      }
    );
    // add to the following list
    UserModel.findByIdAndUpdate(
      req.body.idTofollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(500).json(err);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.unfollow = (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow) )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // delete from the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(500), json(err);
      }
    );
    // delete from the following list
    UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(500).json(err);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
