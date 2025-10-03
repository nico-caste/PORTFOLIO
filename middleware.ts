import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const { pathname } = req.nextUrl;

  // Si no hay token y se intenta acceder a una ruta protegida (que no sea el login),
  // redirigir a la página de login.
  if (!token && pathname.startsWith('/admin') && pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Si hay token, verificarlo
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_PASSWORD);
      await jwtVerify(token, secret);

      // Si el token es válido y el usuario está en la página de login,
      // lo redirigimos al dashboard porque ya está autenticado.
      if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }

      // Si el token es válido, permitir el acceso a la ruta solicitada
      return NextResponse.next();
    } catch (error) {
      // Si el token es inválido, redirigir al login
      console.error("Token validation failed:", error);
      const response = NextResponse.redirect(new URL('/admin', req.url));
      // Limpiar la cookie inválida
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Permitir el acceso a todas las demás rutas no protegidas
  return NextResponse.next();
}

// Configuración para que el middleware solo se ejecute en las rutas de /admin
export const config = {
  matcher: '/admin/:path*',
};