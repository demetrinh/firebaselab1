import * as functions from "firebase-functions";
import { MongoClient } from "mongodb";

const uri: string = functions.config().mongodb.uri;

if (!uri) {
  console.error("ERROR: Missing environment variable MONGO_URI.");
}

let client: MongoClient;

export async function getClient() {
  if (!client || !client.isConnected()) {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.debug("DB CLIENT RECONNECTED");
  }
  return client;
}
