import { Upload } from "../models/upload.models.js";
const PUBLIC_URL = process.env.PUBLIC_URL;

// const MEDIA_PATH = `${__dirname}/../storage`;

const upload = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
      uid: req.uid,
    };

    const data = await Upload.create(fileData);

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error.MulterError);
    return res.status(500).json({ error: "Server error" });
  }
};

export { upload };
