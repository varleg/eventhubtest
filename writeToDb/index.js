const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const endpoint = process.env["COSMOS_DB_ENDPOINT"];
    const key = process.env["COSMOS_DB_KEY"];
    const databaseId = "eventgriddb";
    const containerId = "tenantcontainer";
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    const newItem = {
        test: "1",
        typeofEvent: "create"
    }
    const createdItem = await container.items.create(newItem);
    context.log(createdItem);
}