import { session,readState,connection } from '@/lib/store';
import { json,failure } from '@/lib/http';
export async function GET(){try{const id=await session();const c=connection(id);return json({state:readState(id),connection:c?{sites:c.sites}:null,configured:!!(process.env.ATLASSIAN_CLIENT_ID&&process.env.ATLASSIAN_CLIENT_SECRET&&process.env.TOKEN_ENCRYPTION_KEY)});}catch(e){return failure(e);}}
