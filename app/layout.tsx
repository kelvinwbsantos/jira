import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Notado — trabalho que merece ser visto', description: 'Processos, pessoas e reconhecimento conectados ao Jira.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
