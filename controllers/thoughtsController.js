const { Thought } = require('../models');

module.exports = {

    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // // Get a single thought
    // getSingleThought(req, res) {

    // },

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