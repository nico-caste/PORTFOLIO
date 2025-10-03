import mongoose, { Schema, Document, models } from 'mongoose';

export type ProfileData = {
  _id: string;
  fullName: string;
  locality: string;
  aboutSummary: string;
  portfolioSummary: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
};

export interface IProfile extends Document {
  fullName: string;
  locality: string;
  aboutSummary: string;
  portfolioSummary: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
}

const ProfileSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  locality: { type: String, required: true },
  aboutSummary: { type: String, required: true },
  portfolioSummary: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
  },
  skills: [{ type: String, required: true }],
});

export default models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);