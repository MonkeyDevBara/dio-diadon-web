import type { APIRoute } from 'astro';
import { COOKIE } from '../../server/auth';

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete(COOKIE, { path: '/admin' });
  return redirect('/admin/login', 303);
};
