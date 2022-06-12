import { top250Movies } from "../movie/movie-top250"
import { getInstance } from "./browser";
import { insertTop250Movie, insertTop250Book } from "./mysql-utils";
import { top250Books } from "../book/book-top250";

(async () => {
    // let count = 1;
    // let t = setInterval(async () => {
    //     if (count <= 10) {
    //         // const data = await top250Movies(await getInstance(), count);
    //         // insertTop250Movie(data);
    //         const data = await top250Books(await getInstance(), count);
    //         insertTop250Book(data);
    //         console.log(`save ${count}`);
    //     } else {
    //         clearInterval(t);
    //     }
    //     count++;
    // }, 5000)
})()