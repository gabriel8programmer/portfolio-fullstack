import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Senha não informada' }, { status: 400 });
    }

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'ADMIN_PASSWORD não configurado no servidor' }, { status: 500 });
    }

    if (password === ADMIN_PASSWORD) {
      // Return success with simple token
      const response = NextResponse.json({
        success: true,
        message: 'Autenticado com sucesso',
        token: Buffer.from(`admin:${Date.now()}`).toString('base64'),
      });

      response.cookies.set('admin_auth', 'authenticated', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const isAuthenticated = cookie.includes('admin_auth=authenticated');
  return NextResponse.json({ authenticated: isAuthenticated });
}
