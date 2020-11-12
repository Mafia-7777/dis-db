const mongo = require("mongoose");
const schems = require("../Schems/export");
module.exports = class{
    constructor(options){
        this.defaultPrefix = options.defaultPrefix
    }

    async getGuildData(guildID){
        let data = await schems.guild.findOne({id: guildID});
        if(!data){
            await this.createWithDefaultPrefix(guildID);
            data = await schems.guild.findOne({id: guildID});
        }
        return data;
    }

    async createWithDefaultPrefix(guildID){
        await new schems.guild({
            id: guildID, 
            config: {
                prefix: this.defaultPrefix
            }
        }).save();
    }

    async createWithCustomPrefix(guildID, prefix){
        await new schems.guild({
            id: guildID, 
            config: {
                prefix: prefix
            }
        }).save();
    }
}