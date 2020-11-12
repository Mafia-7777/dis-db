# discorddb
A mongoDB database manager designed for discord bots 

## Quick start
```js
const discorddb = require("discorddb");
let dataManger = new discorddb({
    connectUrl: "mongodb_connection_url",
    defaultPrefix: "!"
})

let Quickstart = async () => {
    await dataManger.asyncConnect();

    let prefix = await dataManger.getPrefix("123");
    console.log(prefix); // !

    let newPrefix = await dataManger.changePrefix("123", "!!");
    console.log(newPrefix); // !!

    let guildData = await dataManger.getGuildData("123")
    console.log(guildData) // { config: { prefix: '!!' }, id: '123' }

    let deleteData = await dataManger.deleteGuildData("123");
    console.log(deleteData); // If there was no data to be delete it will return null, If data was deleted it will return the data

}

Quickstart();
```
___
#### Emits
```
connecting
connected
disconnecting
disconnected
uninitialized
```

##### Example
```js
let emits = ["connecting", "connected", "disconnecting", "disconnected", "uninitialized"];
emits.forEach(emit => {
    dataManger.on(emit, connection => {
        console.log(`dataManger is now ${emit}`)
    })
})
```
___
## All functions
```js
/* Fake emits */
.fakeConnectedEmit()
.fakeConnectingEmit()
.fakeDisconnectingdEmit()
.fakeDisconnectedEmit()
.fakeUninitializedEmit()

/* Data manger */
.getPrefix(guildID: String) // Retunrs the guilds prefix
.changePrefix(guildID: String, newPrefix: String) // Changes a guilds prefix and returns new prefix

.getGuildData(guildID: String) // Retunrs a guilds data
.deleteGuildData(guildID: String) // If data was deleted it returns the data
```
Support server => [Click me](https://discord.gg/MQuDfv5)