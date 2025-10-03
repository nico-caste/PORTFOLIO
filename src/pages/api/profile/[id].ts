import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Profile from '../../../models/Profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const profile = await Profile.findById(id);
        if (!profile) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    case 'PUT':
      try {
        // Usamos findByIdAndUpdate para actualizar el único documento de perfil
        const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!profile) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    default:
      // No implementamos DELETE para el perfil
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}