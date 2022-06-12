import express from 'express';
import { top250, getBooks } from '../router-handler/book-router-handler';

const router = express.Router();

router.get("/getTop250/:pageCount", top250);
router.get("/getBooks/:type/:pageCount", getBooks);

export default router
