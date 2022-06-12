import express from "express";
import bookRouter from '../src/router/book-router'
import cors from 'cors';

const app = express();


app.use(cors());
app.use("/book", bookRouter);

app.listen(8099, () => {
    console.log('start listener...');
});