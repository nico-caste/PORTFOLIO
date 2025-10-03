import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // Si el login es exitoso, redirigimos al dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Contraseña incorrecta.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Contraseña"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button type="submit" className="w-full mt-4 p-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600">
          Entrar
        </button>
      </form>
    </div>
  );
}