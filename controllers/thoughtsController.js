// Requiring the User and Thought model
const { User, Thought } = require('../models');

module.exports = {

    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate({ path: 'reactions', select: "-__v" })
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thought) =>
                !thought    
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },

    // Create a thought
    createThought(req, res) {
        console.log(req.body);

        Thought.create(req.body)
            .then((thought) => {
                return User.findByIdAndUpdate(
                    { _id: req.body.userId },

                    { $push: { thoughts: thought._id.toString() }},
                    { new: true }
                ).then((updatedUser) => {
                    res.json(updatedUser);
                })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Update a thought
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then((thought) =>
            !thought    
                ? res.json(404).json({ message: 'No thought with this ID'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought    
                    ? res.status(404).json({ message: 'No thought with this ID'})
                    : User.deleteMany({ _id: { $in: thought.users }})
                    )
                    .then(() => res.json({ message: 'User and thoughts deleted!'}))
                    .catch((err) => res.status(500).json(err));
    },

    // Add Reaction
    addReaction(req, res) {
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body }},
            { runValidators: true, new: true }
        )

        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this ID'})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },

    // Delete Reaction
    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}}
        )
        .then((thought) =>
            !thought    
                ? res.status(404).json({ message: 'No thought found with this ID'})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },

};