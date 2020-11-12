const mongo = require("mongoose");

const guild = new mongo.Schema({
    id: { type: String, required: true },

    config: {
        prefix: { type: String, required: true }
    }
})

module.exports = mongo.model("Guilds", guild)