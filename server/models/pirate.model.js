const mongoose = require('mongoose')

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "*Name is required"],
        minlength: [5, "Name must be longer than 5 characters"],
        maxlength: [30, 'Name should not be more than 30 characters long']
    },
    img: {
        type: String,
        required: [true, "*Image is required"],
    },
    treasureChest: {
        type: Number,
        required: [true, "*Treasures are required"],
    },
    catchPhrase: {
        type: String,
        required: [true, "*Catch Phrase is required"],
        minlength: [5, "CatchPhrase must be longer than 5 characters"]
    },
    position: {
        type: String,
        required: [true, '*Position is required']
    },
    pegLeg: {
        type: Boolean,
        default: false
    },
    eyePatch: {
        type: Boolean,
        default: false
    },
    hookHand: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Pirate', PirateSchema)