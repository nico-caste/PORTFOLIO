import { SignJWT  } from 'jose';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    // La contraseña es correcta, creamos el token (JWT)
    const secret = new TextEncoder().encode(process.env.ADMIN_PASSWORD);
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // La sesión dura 1 hora
      .sign(secret);

    // Serializamos la cookie
    const serialized = serialize('admin_token', token, {
      httpOnly: true, // La cookie no es accesible desde JS en el cliente
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hora en segundos
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid password' });
}