import mongoose, { Schema, Document, models } from 'mongoose';

export type ProjectData = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  repositoryUrl: string;
  deployUrl?: string;
  technologies: string[];
};

export interface IProject extends Document {
  name: string;
  slug: string;
  description: string;
  repositoryUrl: string;
  deployUrl?: string;
  technologies: string[];
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  repositoryUrl: { type: String, required: true },
  deployUrl: { type: String },
  technologies: [{ type: String, required: true }],
});

export default models.Project || mongoose.model<IProject>('Project', ProjectSchema);