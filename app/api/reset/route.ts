import { NextResponse } from 'next/server';
import { resetPortfolioData } from '@/lib/db';

export async function POST() {
  try {
    const data = resetPortfolioData();
    return NextResponse.json({ success: true, message: 'Dados restaurados com sucesso!', data });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao restaurar dados' }, { status: 500 });
  }
}
