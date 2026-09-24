import { session,saveConnection,writeState } from '@/lib/store';
import { initialState } from '@/lib/model';
import { json,failure,sameOrigin } from '@/lib/http';
export async function POST(req:Request){try{sameOrigin(req);const id=await session();saveConnection(id,null);writeState(id,initialState());return json({ok:true});}catch(e){return failure(e);}}
