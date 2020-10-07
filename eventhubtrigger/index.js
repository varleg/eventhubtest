const { EventHubProducerClient } = require("@azure/event-hubs");
const connectionString = process.env.EVENT_HUB_CONNECTION_STRING;
const eventHubName = "functionappseventhub";
module.exports = async function (context, req) {
    const producer = new EventHubProducerClient(connectionString, eventHubName);
    context.log('JavaScript HTTP trigger function processed a request.');
    const batch = await producer.createBatch();
    batch.tryAdd({ body: "First event" });
    batch.tryAdd({ body: "Second event" });
    batch.tryAdd({ body: "Third event" });

    // Send the batch to the event hub.
    await producer.sendBatch(batch);

    // Close the producer client.
    await producer.close();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}