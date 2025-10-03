import { NextApiRequest, NextApiResponse } from 'next';
import multer, { Multer } from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

type MulterMiddleware = ReturnType<Multer['single']>;
const uploadMiddleware = upload.single('file');

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MulterMiddleware
) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, uploadMiddleware);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'portfolio' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(req.file.buffer);
    });

    res.status(200).json({ success: true, data: uploadResult });
  } catch (error: unknown) {
    console.error('Upload API error:', error);
    
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred.' });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};