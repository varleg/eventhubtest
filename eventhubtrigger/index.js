const { EventhubProducerClient } = require("@azure/event-hubs");
const appInsights = require("applicationinsights");
const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
const eventHubName = "eventhubtestingforpx";
module.exports = async function (context, req) {
    appInsights.start();
    const producer = new EventhubProducerClient(connectionString, eventHubName);

    const batch = await producer.createBatch();
    batch.tryAdd({ body: "first  http event" });
    batch.tryAdd({ body: "second http  event" });
    batch.tryAdd({ body: "third  http event" });

    await producer.sendBatch(batch);
    await producer.close();
    context.log("A batch of three events was sent from azure function after trigger event");
}