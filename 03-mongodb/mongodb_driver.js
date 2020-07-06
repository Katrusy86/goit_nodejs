const { MongoClient} = require("mongodb");


const url = "mongodb://admin:6424618k@cluster0-shard-00-00.oczde.mongodb.net:27017,cluster0-shard-00-01.oczde.mongodb.net:27017,cluster0-shard-00-02.oczde.mongodb.net:27017/db-contacts?ssl=true&replicaSet=atlas-k3d27u-shard-0&authSource=admin&retryWrites=true&w=majority"
const dbName = 'db-contacts';

async function main() {
    const client = await MongoClient.connect(url);
    console.log("Database connection successful");

    const db = client.db(dbName);

process.exit(1);
}

main();