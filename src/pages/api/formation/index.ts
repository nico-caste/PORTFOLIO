import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Formation from '../../../models/Formation';
import { updateProfileSkills } from '../updateProfileSkills';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const formations = await Formation.find({}).sort({ startDate: -1 }).lean();
        res.status(200).json({ success: true, data: formations });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
      }
      break;
    
    case 'POST':
      try {
        const formation = await Formation.create(req.body);
        if (formation.skills) {
          await updateProfileSkills(formation.skills);
        }
        res.status(201).json({ success: true, data: formation });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}