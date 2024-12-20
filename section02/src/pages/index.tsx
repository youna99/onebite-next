// CSS Module
import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';
import Head from 'next/head';

// #1. SSR (getServerSideProps 함수)
// 페이지 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터 불러오는 함수
// 사전 렌더링하는 과정에서 딱 한번만 실행되므로 오직 서버측에서만 실행되는 함수

// #2. SSG - 정적 경로 (getStaticPros 함수)
export const getStaticProps = async () => {
  // ver1. 직렬구조 (한 호출이 끝나야 다음 호출을 진행)
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  // ver2. 병렬 구조로 변경
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: { allBooks, recoBooks },
    // #3. ISG
    // revalidate: 3,
  };
};
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // next에서 제공하는 타입으로 타입을 자동 추천해줌 (#1, #2 동일한 역할)

  return (
    <>
      {/* 탭 타이틀 */}
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요!"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
