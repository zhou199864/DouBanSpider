import { Browser } from "puppeteer"
import { DBBook } from "./book_bean";


const getbooks = async (browser: Browser, searchKeywords: string, spiderPage: number) => {
    if (spiderPage === 0) throw new Error("page can't zero!");
    spiderPage = (spiderPage - 1) * 15;
    const reg = "#root .item-root"
    const page = await browser.newPage();
    await page.goto(`https://search.douban.com/book/subject_search?search_text=${searchKeywords}&cat=1001&start=${spiderPage}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector(reg);


    const result = await page.evaluate(reg => {

        let arr = Array.from(document.querySelectorAll(reg));
        if (arr.length == 17) {
            arr = arr.splice(2, arr.length)
        }
        let bookArray: DBBook[] = [];
        return arr.map(e => {
            //此处用Any类型对于TS来说是不对或者说欠妥的，暂未找到好的解决方法。
            let bookCoverUrl = e.querySelector('img').currentSrc;
            let bookTitle = e.querySelector('img').alt;
            let bookAuthor = e.querySelector('.abstract').textContent;
            let bookDetailUrl = e.querySelector('.cover-link').href;
            let bookScore = ''
            if (e.querySelector('.rating_nums') != null) { bookScore = e.querySelector('.rating_nums').textContent; }
            return bookArray[e.index] = { coverUrl: bookCoverUrl, title: bookTitle, authorInfo: bookAuthor, ratingScore: bookScore, detailUrl: bookDetailUrl }
        });
    }, reg);

    await page.close();
    return result;
}

export {
    getbooks
}