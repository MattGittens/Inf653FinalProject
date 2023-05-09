const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique:true,
    },
    funfacts: [String],
});

module.exports = mongoose.model('code', StateCodeSchema);