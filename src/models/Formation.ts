import mongoose, { Schema, Document, models } from 'mongoose';

export type FormationData = {
  _id: string;
  institution: string;
  title: string;
  type: 'Certificación' | 'Carrera' | 'Curso';
  startDate: string; // Usamos string para facilitar la serialización
  endDate?: string;
  certificateUrl?: string;
  skills: string[];
};

export interface IFormation extends Document {
  institution: string;
  title: string;
  type: 'Certificación' | 'Carrera' | 'Curso';
  startDate: Date;
  endDate?: Date;
  certificateUrl?: string;
  skills: string[];
}

const FormationSchema: Schema = new Schema({
  institution: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['Certificación', 'Carrera', 'Curso'] },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  certificateUrl: { type: String },
  skills: [{ type: String, required: true }],
});

export default models.Formation || mongoose.model<IFormation>('Formation', FormationSchema);