import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getClient } from "../db";
import ShoutOut from "../model/ShoutOut";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const to = req.query.to || "";
  const from = req.query.from || "";
  // possible query... { to: to, from: from }
  const mongoQuery: any = {};
  if (to) {
    mongoQuery.to = to;
  }
  if (from) {
    mongoQuery.from = from;
  }

  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<ShoutOut>("shoutouts")
      .find(mongoQuery)
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("Fail", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/top_names", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<ShoutOut>("shoutouts")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("Fail", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  const shoutOut = req.body as ShoutOut;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<ShoutOut>("shoutouts")
      .insertOne(shoutOut);
    shoutOut._id = result.insertedId;
    res.status(201).json(shoutOut);
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default functions.https.onRequest(app);
