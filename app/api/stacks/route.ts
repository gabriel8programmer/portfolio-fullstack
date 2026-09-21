import { NextResponse } from 'next/server';
import { getStacks, addStack } from '@/lib/db';

export async function GET() {
  try {
    const stacks = getStacks();
    return NextResponse.json(stacks);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar stacks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.category) {
      return NextResponse.json({ error: 'Nome e categoria são obrigatórios' }, { status: 400 });
    }

    const stack = addStack({
      name: body.name,
      category: body.category,
      iconSlug: body.iconSlug || body.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      level: body.level || 'Intermediário',
      color: body.color || '#06b6d4',
      order: Number(body.order) || 0,
    });

    return NextResponse.json(stack, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar stack' }, { status: 500 });
  }
}
