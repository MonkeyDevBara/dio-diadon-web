import { defineMiddleware } from 'astro:middleware';
import { COOKIE, verifySession } from './server/auth';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  if (pathname !== '/admin' && !pathname.startsWith('/admin/')) return next();

  const authed = verifySession(ctx.cookies.get(COOKIE)?.value);
  ctx.locals.admin = authed;
  if (!authed && pathname !== '/admin/login') return ctx.redirect('/admin/login');

  const res = await next();
  // Halaman admin tidak boleh di-cache atau diindeks.
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  res.headers.set('X-Frame-Options', 'DENY');
  return res;
});
