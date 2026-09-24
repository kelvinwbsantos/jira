import { session } from '@/lib/store';
import { jira } from '@/lib/jira';
import { json,failure } from '@/lib/http';
export async function GET(req:Request){try{const id=await session();const site=new URL(req.url).searchParams.get('site')||'';const projects:{id:string;name:string;key:string}[]=[];let start=0;for(let page=0;page<100;page++){const data=await jira(id,site,`project/search?startAt=${start}&maxResults=100`);projects.push(...data.values.map((p:{id:string;name:string;key:string})=>({id:p.id,name:p.name,key:p.key})));if(data.isLast||!data.values.length)return json({projects});start+=data.values.length;}throw new Error('Muitos projetos para esta versão do protótipo.');}catch(e){return failure(e);}}
