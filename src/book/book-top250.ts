import { Browser } from "puppeteer"
import { DBBook } from './book_bean'

const top250Books = async (browser: Browser, count: number) => {
    if (count === 0 || count > 10) throw new Error("page range is 1~10, please checked you request params.");
    count = (count - 1) * 25;
    const reg = "#content table";
    const page = await browser.newPage();
    await page.goto(`https://book.douban.com/top250?start=${count}`);
    await page.waitForSelector(reg);
    const result = await page.evaluate(reg => {
        let arr = Array.from(document.querySelectorAll(reg));
        let bookArray: DBBook[] = [];
        return arr.map(e => {
            let bookCoverUrl = e.querySelector('img').currentSrc;
            let bookTitle = e.querySelector('td:nth-child(2)').querySelector('div>a').innerText;
            let bookAuthor = e.querySelector('td:nth-child(2)').querySelector('.pl').textContent;
            let bookDetailUrl = e.querySelector('td>a').href;
            let bookScore = ''
            if (e.querySelector('td:nth-child(2)').querySelector('.rating_nums') != null) { bookScore = e.querySelector('td:nth-child(2)').querySelector('.rating_nums').textContent; }
            return bookArray[e.index] = { coverUrl: bookCoverUrl, title: bookTitle, authorInfo: bookAuthor, ratingScore: bookScore, detailUrl: bookDetailUrl }
        });
    }, reg);

    await page.close();
    return result;

}

export {
    top250Books
}