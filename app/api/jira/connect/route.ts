import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { session,oauthState } from '@/lib/store';
import { config } from '@/lib/jira';
import { appUrl } from '@/lib/http';
export async function GET(){try{const {client_id,redirect_uri}=config();const id=await session();const state=randomBytes(32).toString('hex');oauthState(id,state);const q=new URLSearchParams({audience:'api.atlassian.com',client_id,scope:'read:jira-work read:jira-user offline_access',redirect_uri,state,response_type:'code',prompt:'consent'});return NextResponse.redirect(`https://auth.atlassian.com/authorize?${q}`);}catch{return NextResponse.redirect(`${appUrl()}/?jira=config`);}}
