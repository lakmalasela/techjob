const mongoose = require('mongoose');

const { Schema } = mongoose; // mongoose eken schema eka gnnwa

const ItemSchema = new Schema({
        price: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        description: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        },

        color: {
            type: String
        }

    }, {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
    }

);

module.exports = mongoose.model("Item", ItemSchema);