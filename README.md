# dis-db
A mongoDB database manager designed for discord bots 
######
![Npm image](https://nodei.co/npm/dis-db.png)
## Quick start
```js
const disdb = require("dis-db");
let dataManger = new disdb({
    connectUrl: "mongodb_connection_url",
    defaultPrefix: "!"
})

let Quickstart = async () => {
    await dataManger.asyncConnect();

    let prefix = await dataManger.getPrefix("123");
    console.log(prefix); // !

    let newPrefix = await dataManger.changePrefix("123", "!!");
    console.log(newPrefix); // !!

    let mogLogID = await dataManger.getModLog("123");
    console.log(mogLogID); // null
    
    let newModLog = await dataManger.changeModLog("123", "123456789");
    console.log(newModLog); // 123456789

    let guildData = await dataManger.getGuildData("123");
    console.log(guildData); // { config: { prefix: '!!' }, id: '123' }

    let deleteData = await dataManger.deleteGuildData("123");
    console.log(deleteData); // { config: { prefix: '!!' }, id: '123' }

    let fetchPing = await dataManger.getFetchPing();
    console.log(fetchPing) // Fetch ping in ms 

    let createAndDeletePing = await dataManger.getCreateAndDeletePing();
    console.log(createAndDeletePing) // { create: pingInMs, delete: pingInMs }

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
        console.log(`dataManger is now ${emit}`);
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

.getModLog(guildID: String) // Retunrs the modlog
.changeModLog(guildID: String, newModLog: String) // Changes the modLog and retunrs the new modLog data

.getGuildData(guildID: String) // Retunrs a guilds data
.deleteGuildData(guildID: String) // If data was deleted it returns the data

/* Others */
.getFetchPing() // Returns the ping in ms
```
Support server => [Click me](https://discord.gg/MQuDfv5)