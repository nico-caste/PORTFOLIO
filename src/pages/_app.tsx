import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Layout } from '../components/layout/Layout';
import { IProfile } from '../models/Profile';
import profileApiHandler from './api/profile';
import { NextApiRequest, NextApiResponse } from 'next';

type ProfileApiResponse = {
  success: boolean;
  data?: IProfile;
  message?: string;
};

interface MyAppProps extends AppProps {
  profileData: IProfile | null;
}

function MyApp({ Component, pageProps, profileData }: MyAppProps) {
  return (
    <Layout profileData={profileData}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  try {
    let profileData = null;
    const req = { method: 'GET' } as NextApiRequest;
    const res = {
      status: (code: number) => ({
        json: (body: ProfileApiResponse) => {
          if (code === 200 && body.success) {
            profileData = body.data || null;
          }
        },
      }),
    } as unknown as NextApiResponse;
    
    await profileApiHandler(req, res);

    return {
      ...appProps,
      profileData,
    };
  } catch (error) {
    console.error('Ocurrió un error al obtener los datos del perfil en _app:', error);
    return { ...appProps, profileData: null };
  }
};

export default MyApp;