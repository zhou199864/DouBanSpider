import { Browser } from "puppeteer"
import { DBMovie } from "./movie-bean"

const movieSearch = async (browser: Browser, searchKeywords: string, spiderPage: number) => {
    if (spiderPage === 0) throw new Error("page can't zero!");
    spiderPage = (spiderPage - 1) * 15;
    const reg = "#root .item-root";
    const page = await browser.newPage();
    await page.goto(`https://search.douban.com/movie/subject_search?search_text=${searchKeywords}&start=${spiderPage}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector(reg);

    const result = await page.evaluate(reg => {
        let arr = Array.from(document.querySelectorAll(reg));
        if (arr.length > 16) {
            arr = arr.splice(1, arr.length);
        }
        let movieArray: DBMovie[] = [];
        return arr.map(e => {
            let movieDetail = e.querySelector('.cover-link').href
            let movieImgUrl = e.querySelector('.cover').currentSrc
            let movieName = e.querySelector('.cover').alt
            let movieStar = "0"
            let movieDirect = "empty";
            let movieType = "empty";
            if (e.querySelector('.detail .rating_nums')) {
                movieStar = e.querySelector('.detail .rating_nums').innerText;
            }
            if (e.querySelector('.detail .abstract_2')) {
                movieDirect = e.querySelector('.detail .abstract_2').textContent;
            }
            if (e.querySelector('.detail .abstract')) {
                movieType = e.querySelector('.detail .abstract').textContent;
            }
            return movieArray[e.index] = {
                name: movieName,
                cover_url: movieImgUrl,
                type: movieType,
                director: movieDirect,
                star: movieStar,
                detail: movieDetail
            }
        });
    }, reg);
    await page.close();
    return result;
}

export {
    movieSearch
}