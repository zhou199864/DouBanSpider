import { Request, Response } from "express"
import { getInstance } from "../utils/browser"
import { ok, error } from "../utils/response-msg"
import { top250Movies } from "../movie/movie-top250"
import { movieSearch } from "../movie/movie-spider"

const top250Movie = async (req: Request, res: Response) => {
    const json = req.params;
    try {
        let arr = await top250Movies(await getInstance(), Number(json.pageCount));
        res.send(ok("send successful.", arr));
    } catch (e) {
        if (e instanceof Error)
            res.send(error("send failed", e.message))
    }
}

const getMovies = async (req: Request, res: Response) => {
    const json = req.params;
    try {
        let arr = await movieSearch(await getInstance(), json.type, Number(json.pageCount));
        res.send(ok("send successful.", arr));
    } catch (e) {
        if (e instanceof Error)
            res.send(error("send failed", e.message))
    }
}

export {
    top250Movie,
    getMovies
}