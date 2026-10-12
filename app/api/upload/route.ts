import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Validate mime type
    const validMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
    ];

    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato de imagem inválido. Formatos suportados: JPG, PNG, WEBP, SVG, GIF.' },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: 'A imagem deve ter no máximo 10MB.' },
        { status: 400 }
      );
    }

    // Read bytes & convert to Base64 Data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/png';
    const base64DataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

    return NextResponse.json({
      success: true,
      url: base64DataUrl,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error('Erro ao converter upload para base64:', error);
    return NextResponse.json(
      { error: 'Falha ao processar a imagem.' },
      { status: 500 }
    );
  }
}
