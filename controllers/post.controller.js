const PostModel = require('../model/post.model');
const UserModel = require('../model/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
};

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err)
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    const updatedMessage = {
        message: req.body.message,
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedMessage},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log("Update err :" + err);
        }
    )
    
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    await PostModel.findByIdAndDelete(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("Update err :" + err);
    })

};

module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { 
                $addToSet: { likers: req.body.id}
            },
            {new: true},
           
        ).catch((err) => {return res.status(500).send({message: err})})

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {likes: req.params.id}
            },
            {new: true},
          
        ).then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({message: err})})
    }   catch(err) {
        return res.status(400).send(err)
    } 
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { 
                $pull: { likers: req.body.id}
            },
            {new: true},
           
        ).catch((err) => {return res.status(500).send({message: err})})

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: {likes: req.params.id}
            },
            {new: true},
          
        ).catch((err) => {return res.status(500).send({message: err})})
    }   catch(err) {
        return res.status(400).send(err)
    } 
}