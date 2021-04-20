import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const client = new MongoClient();

await client.connect("mongodb://localhost:27017");

const database = client.database("deno-test");

export { database }