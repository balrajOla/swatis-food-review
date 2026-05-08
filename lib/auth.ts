import { cookies } from 'next/headers';
import crypto from 'crypto';
const COOKIE = 'swati_admin';
function secret() { return process.env.ADMIN_SESSION_SECRET || 'dev-secret-change-me'; }
export function sign(value: string) { return `${value}.${crypto.createHmac('sha256', secret()).update(value).digest('hex')}`; }
export function verify(token?: string) { if (!token) return false; const [v, sig] = token.split('.'); if (!v || !sig) return false; return sign(v) === token && v === 'admin'; }
export async function isAdmin() { return verify((await cookies()).get(COOKIE)?.value); }
export async function setAdminCookie() { (await cookies()).set(COOKIE, sign('admin'), { httpOnly: true, sameSite:'lax', secure: process.env.NODE_ENV === 'production', path:'/', maxAge: 60*60*24*14 }); }
export async function clearAdminCookie() { (await cookies()).delete(COOKIE); }
export const adminCookieName = COOKIE;
