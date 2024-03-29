const mongoose = require ('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema ({
    username: {
        type        : String,
        required    : true,
        unique      : true
    },
    password: {
        type        : Schema.Types.Mixed,
        required    : true
    }
});

module.exports = mongoose.model('User',UserSchema);
