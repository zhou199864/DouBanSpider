import { Browser } from "puppeteer"
import { DBMovie } from "./movie-bean"

const top250Movies = async (browser: Browser, count: number): Promise<DBMovie[]> => {
    if (count === 0 || count > 10) throw new Error("page range is 1~10, please checked you request params.");
    count = (count - 1) * 25;
    const reg = "#content li .item"
    const page = await browser.newPage();
    await page.goto(`https://movie.douban.com/top250?start=${count}`);
    await page.waitForSelector(reg);
    const result = await page.evaluate(reg => {
        let arr = Array.from(document.querySelectorAll(reg));
        let movieArray: DBMovie[] = [];
        return arr.map(e => {
            let movieDetail = e.querySelector('.pic a').href
            let movieImgUrl = e.querySelector('.pic img').currentSrc
            let movieName = e.querySelector('.pic img').alt
            let movieStar = e.querySelector('.info .star .rating_num').innerText
            let movieQuote = ""
            let movieDirect = "empty";
            let movieType = "empty";
            if (e.querySelector('.info .quote')) {
                movieQuote = e.querySelector('.info .quote').innerText
            }
            let arrayInfo = e.querySelector('.info .bd p').innerText.split('\n') as string[]
            if (arrayInfo.length == 2) {
                movieDirect = arrayInfo[0]
                movieType = arrayInfo[1];
            }
            return movieArray[e.index] = {
                name: movieName,
                cover_url: movieImgUrl,
                type: movieType,
                director: movieDirect,
                star: movieStar,
                quote: movieQuote,
                detail: movieDetail
            }

        });
    }, reg);

    await page.close()
    return result;

}

export {
    top250Movies
}