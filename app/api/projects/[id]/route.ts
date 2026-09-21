import { NextResponse } from 'next/server';
import { updateProject, deleteProject } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const updated = updateProject(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar projeto' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = deleteProject(id);
    if (!success) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Projeto excluído com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir projeto' }, { status: 500 });
  }
}
