import { FiMail, FiPhone } from 'react-icons/fi';

interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface FooterProps {
  contact: ContactInfo;
}

export const Footer = ({ contact }: FooterProps) => {
  return (
    <footer className=" text-white mt-auto pt-6 flex justify-center">
      <div className="container mx-980 p-6 text-center rounded-t-xl bg-gray-800">
        <p>Contáctame:</p>
        <div className="flex justify-center space-x-4 my-2">
            <a href={`mailto:${contact.email}`} className="flex items-center space-x-3 text-text-main hover:text-cyan-400 transition-colors">
              <FiMail size={20} />
              <span>{contact.email}</span>
            </a>
            <span>|</span>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center space-x-3 text-text-main hover:text-cyan-400 transition-colors">
              <FiPhone size={20} />
              <span>{contact.phone}</span>
            </a>
        </div>
      </div>
    </footer>
  );
};