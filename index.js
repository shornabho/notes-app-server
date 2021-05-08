import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import notesRouter from "./routes/notes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/notes', notesRouter);

mongoose.connect(MONGODB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error(error));