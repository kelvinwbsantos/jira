import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { cookies } from 'next/headers';
import { initialState, type State } from './model';
let db:DatabaseSync;
function database(){ if(!db){const path=process.env.DATABASE_PATH||'.data/notado.sqlite';mkdirSync(dirname(path),{recursive:true});db=new DatabaseSync(path);db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, state TEXT NOT NULL, connection TEXT, oauth TEXT)');}return db;}
export async function session(){const jar=await cookies();let id=jar.get('notado_session')?.value;if(!id||!/^[a-f0-9]{64}$/.test(id)||!database().prepare('SELECT id FROM sessions WHERE id=?').get(id)){id=randomBytes(32).toString('hex');database().prepare('INSERT INTO sessions (id,state) VALUES (?,?)').run(id,JSON.stringify(initialState()));jar.set('notado_session',id,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30});}return id;}
export function readState(id:string):State{return JSON.parse((database().prepare('SELECT state FROM sessions WHERE id=?').get(id) as {state:string}).state);}
export function writeState(id:string,state:State){database().prepare('UPDATE sessions SET state=? WHERE id=?').run(JSON.stringify(state),id);}
function key(){const k=process.env.TOKEN_ENCRYPTION_KEY||'';if(!/^[a-fA-F0-9]{64}$/.test(k))throw new Error('Configure TOKEN_ENCRYPTION_KEY com 64 caracteres hexadecimais.');return Buffer.from(k,'hex');}
export function encrypt(value:unknown){const iv=randomBytes(12);const cipher=createCipheriv('aes-256-gcm',key(),iv);return Buffer.concat([iv,cipher.update(JSON.stringify(value)),cipher.final(),cipher.getAuthTag()]).toString('base64');}
export function decrypt<T>(value:string):T{const b=Buffer.from(value,'base64');const cipher=createDecipheriv('aes-256-gcm',key(),b.subarray(0,12));cipher.setAuthTag(b.subarray(-16));return JSON.parse(Buffer.concat([cipher.update(b.subarray(12,-16)),cipher.final()]).toString());}
export type Connection={access_token:string;refresh_token?:string;expiresAt:number;sites:{id:string;name:string;url:string}[]};
export function connection(id:string):Connection|null{const row=database().prepare('SELECT connection FROM sessions WHERE id=?').get(id) as {connection:string|null};return row.connection?decrypt<Connection>(row.connection):null;}
export function saveConnection(id:string,value:Connection|null){database().prepare('UPDATE sessions SET connection=? WHERE id=?').run(value?encrypt(value):null,id);}
export function oauthState(id:string,value:string){database().prepare('UPDATE sessions SET oauth=? WHERE id=?').run(JSON.stringify({value,expires:Date.now()+600000}),id);}
export function consumeOAuth(id:string,value:string){const row=database().prepare('SELECT oauth FROM sessions WHERE id=?').get(id) as {oauth:string|null};database().prepare('UPDATE sessions SET oauth=NULL WHERE id=?').run(id);if(!row.oauth)return false;const data=JSON.parse(row.oauth);return data.value===value&&data.expires>Date.now();}
