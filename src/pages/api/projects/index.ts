import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Project from '../../../models/Projects';
import slugify from 'slugify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find({}).lean();
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    case 'POST':
      try {
        const { name } = req.body;
        const slug = slugify(name, { lower: true, strict: true });
        const project = await Project.create({ ...req.body, slug });
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}