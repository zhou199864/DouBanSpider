# 基于Puppeteer实现简单的豆瓣书籍爬取
下面我们直奔主题
### 第一步
分析豆瓣图书的URL`https://search.douban.com/book/subject_search?search_text=java&cat=1001&start=0` 发现其中 `search_text` 为搜索关键字 `start` 为开始页数。由以上分析我们就可以构建一个模板字符串生产对于的URL地址 `https://search.douban.com/book/subject_search?search_text=${searchKeywords}&cat=1001&start=${spiderPage}` 直接替换成参数即可。

### 第二步
定义如下函数
```typescript
//传入浏览器实例，搜索关键字，爬取的页数 1.2.3.4...
const bookInfo = async (browser: Browser, searchKeywords: string, spiderPage: number) => {
    //判断页数是否大于0，如果小于0的话下面的计算公式就会失效。
    if (spiderPage === 0) throw new Error("page can't zero!");
    //因为1页有15条数据所以根据页数我们就可以计算出start这个参数
    spiderPage = (spiderPage - 1) * 15;
    const reg = "#root .item-root"
    const page = await browser.newPage();
    await page.goto(`https://search.douban.com/book/subject_search?search_text=${searchKeywords}&cat=1001&start=${spiderPage}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector(reg);

    //evaluate方法中使用到的参数一定要在后面args...传入否则会出现null
    const result = await page.evaluate((reg, spiderPage) => {

        let arr = Array.from(document.querySelectorAll(reg));
        //这里是因为有部分书的页面会为17条前面会多两条数据，个人觉得无用直接splice
        if (arr.length == 17) {
            arr = arr.splice(2, arr.length)
        }
        let bookArray: DBBook[] = []
        return arr.map(e => {
            //此处用Any类型对于TS来说是不对或者说欠妥的，暂未找到好的解决方法。
            let bookCoverUrl = e.querySelector('img').currentSrc;
            let bookTitle = e.querySelector('img').alt;
            let bookAuthor = e.querySelector('.abstract').textContent;
            let bookDetailUrl = e.querySelector('.cover-link').href;
            let bookScore = ''
            //注意此处因为部分书籍没有评分就会出现null错误，注意判空。其他prop也是一样根据实际情况去判断即可这里偷懒就写了一个。
            if (e.querySelector('.rating_nums') != null) { bookScore = e.querySelector('.rating_nums').textContent; }
            return bookArray[e.index] = { coverUrl: bookCoverUrl, title: bookTitle, authorInfo: bookAuthor, ratingScore: bookScore, detailUrl: bookDetailUrl }
        });
    }, reg, spiderPage);

    return result;
}
```
另外定义了一个 `DBBook` 接口用于限制数据类型。
```typescript
interface DBBook{
    coverUrl: string;
    title: string;
    authorInfo: string;
    ratingScore: string;
    detailUrl: string;
}
```

### 第三步
简单测试一下
```typescript
const book = await bookInfo(browser, 'java', 1);
console.log(book);

//在控制台输出
[
  {
    coverUrl: 'https://img2.doubanio.com/view/subject/m/public/s33556751.jpg',
    title: 'Java核心技术·卷 I（原书第11版） : 基础知识',
    authorInfo: '[美] 凯 S.霍斯特曼（Cay S.Horstmann） / 林琪 / 苏钰涵 / 机械工业出版社 / 2019-11-25 / 149元',
    ratingScore: '9.4',
    detailUrl: 'https://book.douban.com/subject/34898994/'
  },...省略其他数据
]
```