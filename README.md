# DouBanSpider
Using puppeteer to fetch some book, movie data.

## How to run?
1. git clone this project
2. using `npm i` install all dependences
3. run `ts-node app.ts` and in the terminal will print start listener

## How to using post/get request to get some data.
### Book or Movie
1. `localhost:8099/book(movie)/getTop250/{pageCount}` pageCount range is 1..10
2. `localhost:8099/book(movie)/getBooks(getMovies)/{type}/{pafeCount}` type-> search keywords, pageCount-> page num.