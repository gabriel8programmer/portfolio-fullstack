import { NextResponse } from 'next/server';
import { getMessages, addMessage, deleteMessage } from '@/lib/db';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar mensagens' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor preencha nome, e-mail e mensagem.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor insira um e-mail válido.' },
        { status: 400 }
      );
    }

    const saved = addMessage({ name, email, message });
    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!', data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar mensagem' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID da mensagem é obrigatório' }, { status: 400 });
    }

    const deleted = deleteMessage(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir mensagem' }, { status: 500 });
  }
}
