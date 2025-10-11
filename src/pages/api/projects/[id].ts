import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Project from '../../../models/Projects';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const project = await Project.findById(id).lean();
        if (!project) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const project = await Project.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!project) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedProject = await Project.deleteOne({ _id: id });
        if (!deletedProject.deletedCount) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}