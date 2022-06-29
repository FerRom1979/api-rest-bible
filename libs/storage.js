import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 },
});
