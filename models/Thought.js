const { Schema, model } = require('mongoose');
const { Thought } = require('.');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // use getter method to format the timestamp on query
        },
        username: [
            {
                type: String,
                required: true,
                // IS THIS FORMAT RIGHT???
            }
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

thoughtSchema
    // getter method to format the timestamp on query
    .get(function () {
        return `date: ${this.createdAt}`;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;