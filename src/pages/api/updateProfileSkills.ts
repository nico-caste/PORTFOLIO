import Profile from '../../models/Profile';

export async function updateProfileSkills(newSkills: string[]) {
  if (!newSkills || newSkills.length === 0) {
    return;
  }

  try {
    const profile = await Profile.findOne({});
    if (!profile) {
      console.log('No profile found to update skills.');
      return;
    }

    const skillsSet = new Set(profile.skills);
    newSkills.forEach(skill => skillsSet.add(skill));

    profile.skills = Array.from(skillsSet).sort();
    await profile.save();

  } catch (error) {
    console.error("Error updating profile skills:", error);
  }
}