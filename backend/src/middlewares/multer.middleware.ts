import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/images');
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueName = `${base}-${nanoid()}${ext}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
