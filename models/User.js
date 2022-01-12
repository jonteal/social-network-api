const { Schema, model } = require('mongoose');
// const 

// Schema to create a User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: find out how to validate email
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        // toJSON: {
        //     virtuals: true,
        // },
        // id: false
        // DOUBLE CHECK THIS PART AND REFERENCE THE SCHEMA SETTINGS IN README
        
    }
)
