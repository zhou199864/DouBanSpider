import { top250Books } from "../book/book-top250"
import { Request, Response } from "express"
import { ok, error } from "../utils/response-msg";
import { getInstance } from "../utils/browser";
import { getbooks } from "../book/book-spider";

const top250 = async (req: Request, res: Response) => {
    const json = req.params;
    try {
        let arr = await top250Books(await getInstance(), Number(json.pageCount));
        res.send(ok("send successful.", arr));
    } catch (e) {
        if (e instanceof Error)
            res.send(error("send failed", e.message))
    }
}

const getBooks = async (req: Request, res: Response) => {
    const json = req.params;
    try {
        let arr = await getbooks(await getInstance(), json.type, Number(json.pageCount));
        res.send(ok("send successful.", arr));
    } catch (e) {
        if (e instanceof Error)
            res.send(error("send failed", e.message))
    }
}

export {
    top250,
    getBooks
}