import express from 'express';
import multer from 'multer';
import { convertVideoToMp3 } from '../controllers/videoController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/convert', upload.single('video'), convertVideoToMp3);

export default router;
