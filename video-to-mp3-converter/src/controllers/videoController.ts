import { Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export const convertVideoToMp3 = (req: Request, res: Response) => {
  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, '..', '..', 'outputs', `${req.file.originalname}.mp3`);

  ffmpeg(inputPath)
    .toFormat('mp3')
    .on('end', () => {
      res.download(outputPath, (err) => {
        if (err) {
          console.error(err);
        }
        // Clean up files
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).send('Error converting video to MP3');
    })
    .save(outputPath);
};
