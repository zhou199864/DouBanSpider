import mysql from 'mysql'
import { DBBook } from '../book/book_bean';
import { DBMovie } from '../movie/movie-bean';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'douban'
});

connection.connect(error => {
    if (error) {
        console.log("can't connect mysql.");
        return;
    }
    console.log('mysql connected.');
});

const insertTop250MOvie = async (movies: DBMovie[]) => {
    movies.forEach(e => {
        connection.query("insert into top_250_movie set ?", e, (error, result, fields) => {
            if (error) throw error;
        })
    });
}

const insertTop250Book = async (books: DBBook[]) => {
    books.forEach(e => {
        connection.query("insert into top_250_book set ?", e, (error, result, fields) => {
            if (error) throw error;
        })
    });
}

export {
    insertTop250MOvie
}
