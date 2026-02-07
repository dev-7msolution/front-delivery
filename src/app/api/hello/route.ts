import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validação para a requisição
const requestSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
});

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from Next.js API!',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar dados com Zod
    const validatedData = requestSchema.parse(body);
    
    return NextResponse.json({
      message: `Olá, ${validatedData.name}!`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
