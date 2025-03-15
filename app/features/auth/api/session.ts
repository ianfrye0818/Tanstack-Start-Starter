import { useSession } from '@tanstack/react-start/server';

export type AppSession = {
  userId: string;
};

export const useAppSession = () => {
  return useSession<AppSession>({
    password: process.env.SESSION_PASSWORD as string,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: 'lax',
    },
  });
};
