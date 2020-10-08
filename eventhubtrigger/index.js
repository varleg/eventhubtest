const { EventHubProducerClient } = require("@azure/event-hubs");
const { v4: uuidv4 } = require('uuid');
//const connectionString = process.env.EVENT_HUB_CONNECTION_STRING;
const config = require("../local/config");
const connectionString = config.connectionString;
const eventHubName = "functionAppsEventHub";
console.log(connectionString);
module.exports = async function (context, req) {

    const msgId = uuidv4();
    const timeStamp = new Date().toISOString();
    context.bindings.outputEvent = {
        id: msgId,
        subject: 'tenant',
        dataVersion: '1.0',
        eventType: 'event-type',
        data: "event-data",
        eventTime: timeStamp
    };
}