// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$/lib/server/auth').SessionValidationResult['user'];
			session: import('$/lib/server/auth').SessionValidationResult['session'];
			DB: DrizzleD1Database;
		}

		interface Platform {
			env: {
				DB: D1Database;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache }
		}
	}
}

export { };
