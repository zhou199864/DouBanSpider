import express from "express"
import bookRouter from '../src/router/book-router'
import movieRouter from '../src/router/movie-router'
import cors from 'cors';

const app = express();


app.use(cors());
app.use("/book", bookRouter);
app.use("/movie", movieRouter);

app.listen(8099, () => {
    console.log('start listener...');
});