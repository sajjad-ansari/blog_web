import express from 'express';
import upload from '../middleware/multerconfig.js';
import { createBLog, deleteBlog, getBlog, getBLogById, updateBLog } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/blog', createBLog);
router.get('/blog', getBlog);
router.get('/blog/:blog_id', getBLogById);
router.put('/blog/:blog_id', updateBLog);
router.delete('/blog/:blog_id', deleteBlog);


export default router;