const mongo = require("mongoose");

const guild = new mongo.Schema({
    id: { type: String, required: true },

    config: {
        prefix: { type: String, required: true },
        modLog: { type: String, default: null }
    }
})

module.exports = mongo.model("Guilds_dis-db", guild);