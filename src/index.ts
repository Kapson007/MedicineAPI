import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connect } from "./db/connectToDB";

dotenv.config();

const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
    console.log(`Hello running server from http://localhost:${process.env.PORT}`);
    await connect();
});

