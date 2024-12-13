import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

// 기존에 Next.js에서 제공하는 NextPage라는 타입(page컴포넌트 타입)에 getLayout이라는 메소드에 이러한 타입을 추가한 것
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  // getLayout 메소드가 없는 경우를 고려
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
