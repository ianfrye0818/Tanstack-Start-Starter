import { clerkClient } from '@clerk/tanstack-start/server';

export const clerk = clerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
