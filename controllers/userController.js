// Requiring the User and Thought models
const { User, Thought } = require('../models');
const thoughtsController = require('./thoughtsController');

module.exports = {

    // Get all users
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

    // Get a single user with ID
    getSingleUser(req, res) {
        console.log("hello world");
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

    // Create User
    createUser(req,res) {
        User.create(req.body) 
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Update user using user Id
    updateUser(req,res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.json(404).json({ message: "No users with this ID, but you can create one!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete User with userID
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user   
                    ? res.status(404).json({ message: 'User does not exist!' })
                : Thought.findOneAndUpdate(
                    { users: req.params.userId },
                    { $pull: {users: req.params.userId }},
                    { multi: true }
                ))
        .then((thought) => 
        !thought    
            ? res.status(404).json({ message: 'User deleted successfully but did not have thoughts to delete.'})
            : res.json({ message: 'User was deleted'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // Add Friend using your userId and theirs
    addFriend(req,res) {
        console.log('You have added a new friend!');
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user   
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },

    // Remove friend using your userId and theirs
    removeFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that ID'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};