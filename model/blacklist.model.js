const mongoose = require("mongoose");

const BlackSchema = mongoose.Schema({
    token: String
}, {
    versionKey : false
})

const BlackModel = mongoose.model("blacklist", BlackSchema);

module.exports = {
    BlackModel
}