import { NextResponse } from 'next/server';
import { updateStack, deleteStack } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const updated = updateStack(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Stack não encontrada' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar stack' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = deleteStack(id);
    if (!success) {
      return NextResponse.json({ error: 'Stack não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Stack removida com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir stack' }, { status: 500 });
  }
}
