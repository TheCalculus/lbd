import type { Handle } from '@sveltejs/kit';
import * as auth from '$/lib/server/auth.js';
import { drizzle } from 'drizzle-orm/d1';
import { D1Database$ } from 'cfw-bindings-wrangler-bridge';

const handleAuth: Handle = async ({ event, resolve }) => {
	event.locals.DB = drizzle(new D1Database$(import.meta.env.VITE_DB_NAME));

	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(event, sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
