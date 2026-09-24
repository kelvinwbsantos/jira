import { session,readState,writeState } from '@/lib/store';
import { applyAction } from '@/lib/actions';
import { json,failure,sameOrigin } from '@/lib/http';
export async function POST(req:Request){try{sameOrigin(req);const body=await req.json();const id=await session();const state=applyAction(readState(id),body);writeState(id,state);return json({state});}catch(e){return failure(e);}}
