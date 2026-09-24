import { NextResponse } from 'next/server';
export function appUrl(){return process.env.APP_URL||'http://localhost:3000';}
export function sameOrigin(request:Request){if(request.headers.get('origin')!==new URL(appUrl()).origin)throw new Error('Origem da requisição não autorizada.');}
export function failure(error:unknown){const message=error instanceof Error?error.message:'Não foi possível concluir a operação.';return NextResponse.json({error:message},{status:400});}
export function json(value:unknown){return NextResponse.json(value,{headers:{'Cache-Control':'no-store'}});}
