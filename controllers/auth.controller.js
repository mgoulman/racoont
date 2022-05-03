const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    }) 
}

module.exports.signUp = async(req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    } catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    }
};

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.login(email, password);
        console.log('++++++++>', user);
        const token = createToken(user[0]._id);
        res.cookie('jwt', token, { hhtpOnly: true, maxAge: maxAge})
        res.status(201).json({user: user[0]._id});
    } catch (err) {
        console.log(err);
        const errors = signInErrors(err)
        res.status(200).send({errors});
    }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}