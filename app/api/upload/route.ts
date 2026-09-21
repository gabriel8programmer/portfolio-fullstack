import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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

    // Read bytes
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure target directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create safe unique filename
    const originalName = file.name || 'image.png';
    const ext = path.extname(originalName) || '.png';
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const filename = `${baseName}-${Date.now().toString(36)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Save file
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/projects/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return NextResponse.json(
      { error: 'Falha ao salvar a imagem no servidor.' },
      { status: 500 }
    );
  }
}
