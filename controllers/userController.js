const { User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(async (users) => {
            const userObj = {
                users,
            };
            return res.json(userObj);
        });
    },

    getSingleUser(req, res) {

    }, 

    createUser(req,res) {

    },

    updateUser(req,res) {

    },

    deleteUser(req, res) {

    },

    addFriend(req,res) {

    },

    removeFriend(req,res) {

    },
};