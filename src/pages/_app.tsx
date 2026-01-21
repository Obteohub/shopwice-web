// Imports
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import Script from 'next/script';

import client from '@/utils/apollo/ApolloClient';
import CartInitializer from '@/components/Cart/CartInitializer.component';

// Types
import type { AppProps } from 'next/app';

// Styles
import '@/styles/globals.css';
import 'nprogress/nprogress.css';

// NProgress
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import { DefaultSeo } from 'next-seo';

// ... existing imports ...

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <DefaultSeo
        titleTemplate="%s | Shopwice"
        defaultTitle="Shopwice"
        openGraph={{
          type: 'website',
          locale: 'en_GB',
          url: 'https://shopwice.com/',
          siteName: 'Shopwice',
        }}
        twitter={{
          handle: '@shopwice',
          site: '@shopwice',
          cardType: 'summary_large_image',
        }}
      />
      <CartInitializer />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
