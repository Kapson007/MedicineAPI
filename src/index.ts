import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connect } from "./db/connectToDB";
import medicines from "./router/medicines"
import cures from "./router/cures";
import router from "./router/index";
import supplemets from "./router/supplements";
import vaccines from "./router/vaccines";

dotenv.config();

const BASIC_URL = process.env.BASIC_URL;
const app = express();

app.use(bodyParser.json());
app.use(`/medicines`, medicines());
app.use('/cures', cures());
app.use('/supplements', supplemets());
app.use('/vaccines', vaccines());
app.use('/auth', router());

const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
    console.log(`Hello running server from http://localhost:${process.env.PORT}`);
    await connect();
});

