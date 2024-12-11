import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 루트 컴포넌트로 모든 페이지 컴포넌트의 부모컴포넌트이다. */}

      {/* 공통 컴포넌트를 넣을 수 있다 */}
      <header>글로벌 헤더</header>
      <Component {...pageProps} />
    </>
  );
}
