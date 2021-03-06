const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Thought Schema
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
            get: (timeValue) => moment(timeValue).format('MM/DD/YYYY [at] hh:mm a')
        },
        username: [
            {
                type: String,
                required: true,
            }
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;