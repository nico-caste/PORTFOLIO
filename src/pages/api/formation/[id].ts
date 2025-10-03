import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Formation from '../../../models/Formation';
import { updateProfileSkills } from '../updateProfileSkills';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const formation = await Formation.findById(id);
        if (!formation) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: formation });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    case 'PUT':
      try {
        const formation = await Formation.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!formation) return res.status(404).json({ success: false });
          if (formation.skills) {
            await updateProfileSkills(formation.skills);
          }
        res.status(200).json({ success: true, data: formation });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    case 'DELETE':
      try {
        const deleted = await Formation.deleteOne({ _id: id });
        if (!deleted.deletedCount) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}