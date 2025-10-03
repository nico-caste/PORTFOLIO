import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Profile from '../../models/Profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const profileData = await Profile.findOne({}); 
    if (!profileData) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}