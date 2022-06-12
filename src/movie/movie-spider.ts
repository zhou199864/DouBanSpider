async () => {
    // const reg = '#upcoming>.mod-bd>.lists>li';
    // const regImg = '#upcoming>.mod-bd>.lists>li img';
    // const page = await browser.newPage();
    // await page.goto('https://movie.douban.com/cinema/nowplaying/beijing/', { waitUntil: 'networkidle2' });
    // await page.waitForSelector(reg);
    // await page.waitForSelector(regImg);
    // const result = await page.evaluate(reg => {
    //     let arr = Array.from(document.querySelectorAll(reg)) as HTMLUListElement[];
    //     return arr.map(e => {
    //         return { 'title': e.attributes.getNamedItem('data-title')?.nodeValue, 'score': e.attributes.getNamedItem('data-score')?.nodeValue};
    //     });
    // }, reg);

    // const picUrl = await page.evaluate(reg => {
    //     let arr = Array.from(document.querySelectorAll(reg)) as HTMLImageElement[];
    //     return arr.map(e => {
    //         return { 'url': e.currentSrc };
    //     });
    // }, regImg);

    // let arr: Movie[] = [];

    // for (let index = 0; index < result.length; index++) {
    //     arr[index] = { name: result[index].title, coverUrl: picUrl[index].url, score: result[index].score}
    // }

    // console.log(arr);
    // browser.close();
}