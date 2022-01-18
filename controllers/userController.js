const { User, Thought } = require('../models');

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
        User.findOne({ _id: req.params.userId })
            .populate({ path: 'thoughts', select: '-__v' })

            .populate({ path: 'friends', select: '-__v' })

            .select('-__v')
            .then(async (user) => 
                !user  
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
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