import { GetStaticProps, NextPage } from 'next';
import { FormationData } from '../models/Formation';
// import dbConnect from '../lib/mongodb';
// import Formation from '../models/Formation';
// import mongoose from 'mongoose';

// type LeanFormation = Omit<FormationData, '_id' | 'startDate' | 'endDate'> & { 
//   _id: mongoose.Types.ObjectId;
//   startDate: Date;
//   endDate?: Date;
// };

import type { Types } from 'mongoose';

type LeanFormation = Omit<FormationData, '_id' | 'startDate' | 'endDate'> & { 
  _id: Types.ObjectId;
  startDate: Date;
  endDate?: Date;
};

interface FormationPageProps {
  formations: FormationData[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
  });
};

const FormationPage: NextPage<FormationPageProps> = ({ formations }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">Formación Académica</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {formations.map((item) => (
          <div key={item._id} className="bg-surface p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="text-lg text-gray-300">{item.institution}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {formatDate(item.startDate)}
                  {item.endDate ? ` - ${formatDate(item.endDate)}` : ' - Presente'}
                </p>
              </div>
            </div>
            {item.skills && item.skills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700 mb-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">APTITUDES OBTENIDAS:</h3>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="space-x-4">
              {item.certificateUrl && (
                <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer" className="font-bold        hover:text-cyan-400 transition-colors">
                   Ver Certificado
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const dbConnect = (await import('../lib/mongodb')).default;
  const Formation = (await import('../models/Formation')).default;

  try {
    await dbConnect();
    const formationsResult = await Formation.find({}).sort({ startDate: -1 }).lean() as unknown as LeanFormation[];

    const serializableFormations = formationsResult.map(formation => ({
      ...formation,
      _id: formation._id.toString(),
      startDate: formation.startDate.toISOString(),
      endDate: formation.endDate ? formation.endDate.toISOString() : undefined,
    }));

    return { props: { formations: serializableFormations }, revalidate: 60 };
  } catch (error) {
    console.error("Failed to fetch data for formation page:", error);
    return { props: { formations: [] } };
  }
};

export default FormationPage;