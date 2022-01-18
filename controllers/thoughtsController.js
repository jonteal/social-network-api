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

    // // Get a single thought
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

    // // create a thought
    // createThought(req, res) {

    // },

    // // update a thought
    // updateThought(req, res) {

    // },

    // // delete thought
    // deleteThought(req, res) {

    // },

    // addReaction(req, res) {

    // },

    // deleteReaction(req, res) {

    // }

}