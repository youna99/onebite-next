import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push('/test');
  };
  return (
    <>
      {/* 루트 컴포넌트로 모든 페이지 컴포넌트의 부모컴포넌트이다. */}
      {/* 공통 컴포넌트를 넣을 수 있다 */}

      <header>
        <Link href={'/'}>index</Link>
        &nbsp;
        <Link href={'/search'}>search</Link>
        &nbsp;
        <Link href={'/book/1'}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
