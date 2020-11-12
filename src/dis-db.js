const { EventEmitter } = require("events");
const mongo = require("mongoose");
const schems = require("./Schems/export");
module.exports = class disdb extends EventEmitter{
    /**
     * 
     * @param {Object} options
     * @param {String} options.connectUrl
     * @param {String} options.defaultPrefix
     */
    constructor(options){
        super();


        if(typeof options != "object") throw new Error("Your options must be a object");
        if(!options.connectUrl) throw new Error("You must provide a connect url");
        //if(!options.defaultPrefix) throw new Error("You must provide a default prefix")

        this.data = {
            connectUrl: options.connectUrl,
            defaultPrefix: options.defaultPrefix
        }

        /* Emits */
        let types = ["connecting", "connected", "disconnecting", "disconnected", "uninitialized"]
        types.forEach(type => {
            mongo.connection.on(type, () => this.emit(type, mongo.connection));
        })
    }


    async asyncConnect(){

        await mongo.connect(this.data.connectUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        }).catch(err => {
            throw new Error(err);
        })

    }

    Connect(){
        mongo.connect(this.data.connectUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        }).catch(err => {
            throw new Error(err);
        })

    }


    /*      Prefix stuff        */

    /**
     * 
     * @param {String} guildID 
     */
    async getPrefix(guildID){
        if(!guildID) throw new Error("You must provide a guildID");
        if(typeof guildID != 'string') throw new Error("guildID must be a string");
        if(!this.data.defaultPrefix) throw new Error("You must provide a default prefix");
        let data = await schems.guild.findOne({id: guildID});
        if(!data){
            await new schems.guild({
                id: guildID, 
                config: {
                    prefix: this.data.defaultPrefix
                }
            }).save();
            data = await schems.guild.findOne({id: guildID});
        }
        return data.config.prefix;
    }

    /**
     * 
     * @param {String} guildID 
     * @param {String} prefix 
     */
    async changePrefix(guildID, prefix){
        if(!guildID) throw new Error("You must provide a guildID");
        if(typeof guildID != 'string') throw new Error("guildID must be a string");
        if(!prefix) throw new Error("You must provide a prefix");
        if(typeof prefix != 'string') throw new Error("prefix must be a string");
        if(!this.data.defaultPrefix) throw new Error("You must provide a default prefix");
        let data = await schems.guild.findOne({id: guildID});
        if(!data){
            await new schems.guild({
                id: guildID, 
                config: {
                    prefix: this.data.defaultPrefix
                }
            }).save();
            data = await schems.guild.findOne({id: guildID});
        }
        data.config.prefix = prefix;
        await data.save();
        return data.config.prefix
    }



    /*       guild stuff        */


    /**
     * 
     * @param {String} guildID 
     */
    async getGuildData(guildID){
        if(!guildID) throw new Error("You must provide a guildID");
        if(typeof guildID != 'string') throw new Error("guildID must be a string");
        let data = await schems.guild.findOne({id: guildID});
        if(!data){
            await new schems.guild({
                id: guildID, 
                config: {
                    prefix: this.data.defaultPrefix
                }
            }).save();
            data = await schems.guild.findOne({id: guildID});
        }
        return data;
    }

    /**
     * 
     * @param {String} guildID 
     */
    async deleteGuildData(guildID){
        if(!guildID) throw new Error("You must provide a guildID");
        if(typeof guildID != 'string') throw new Error("guildID must be a string");
        let remove = await schems.guild.findOneAndDelete({id: guildID});
        return remove;
    }






    fakeConnectedEmit(){
        return this.emit("connected", mongo.connection);
    }
    fakeConnectingEmit(){
        return this.emit("connecting", mongo.connection);
    }
    fakeDisconnectingdEmit(){
        return this.emit("disconnecting", mongo.connection);
    }
    fakeDisconnectedEmit(){
        return this.emit("disconnected", mongo.connection);
    }
    fakeUninitializedEmit(){
        return this.emit("uninitialized", mongo.connection);
    }

}