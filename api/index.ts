import cors from "cors";
import express from "express"
import linksRouter from "./routers/Links";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/links', linksRouter);



const run = async () => {
    await mongoose.connect('mongodb://localhost/links');

    app.listen(port, () => {
        console.log('Server started on port ' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
};

run().catch(err => console.error(err));