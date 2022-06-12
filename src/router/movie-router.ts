import express from "express"
import { top250Movie, getMovies } from "../router-handler/movie-router-handler"

const router = express.Router();

router.get("/top250/:pageCount", top250Movie);
router.get("/getMovies/:type/:pageCount", getMovies);

export default router