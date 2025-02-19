import { getAuth } from '@clerk/tanstack-start/server';
import { createMiddleware, createServerFn } from '@tanstack/start';
import { getWebRequest } from '@tanstack/start/server';
import { clerk } from '@/shared/lib/clerk';

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest()!);

  return {
    userId,
  };
});

export const getClerkUser = createServerFn({ method: 'GET' }).handler(async () => {
  const auth = await fetchClerkAuth();
  if (!auth.userId) return null;
  const user = await clerk.users.getUser(auth.userId);

  return {
    clerkUserId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0].emailAddress,
  };
});

export const checkAuth = createMiddleware().server(async ({ next }) => {
  const user = await getClerkUser();

  return next({
    context: {
      user,
      status: user ? 'Authenticated' : 'Unauthenticated',
    },
  });
});
