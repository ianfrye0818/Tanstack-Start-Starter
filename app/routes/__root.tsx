import { QueryClient } from '@tanstack/react-query';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import * as React from 'react';
import { Toaster } from 'sonner';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import appCss from '~/shared/styles/app.css?url';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from '~/shared/components/layout/Footer';
import { getUser } from '~/features/auth/api/auth-actions';
import { UserEntity } from '~/features/auth/models/UserEntity';

type AppContext = {
  queryClient: QueryClient;
  user: UserEntity | null;
};

export const Route = createRootRouteWithContext<AppContext>()({
  beforeLoad: async () => {
    const resp = await getUser();
    return {
      user: resp.data,
    };
  },
  head: () => ({
    title: 'Starter Project',
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className='flex flex-col min-h-screen'>
          <main className='flex-1 p-4 container mx-auto'>
            {children}
            {import.meta.env.NODE_ENV !== 'production' && (
              <>
                <ReactQueryDevtools buttonPosition='bottom-right' />
                <TanStackRouterDevtools position='bottom-left' />
              </>
            )}
            <Toaster />
          </main>
          <Footer />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
