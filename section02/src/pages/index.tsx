// CSS Module
import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// #1. SSR (getServerSideProps 함수)
// 페이지 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터 불러오는 함수
// 사전 렌더링하는 과정에서 딱 한번만 실행되므로 오직 서버측에서만 실행되는 함수

// #2. SSG - 정적 경로 (getStaticPros 함수)
export const getStaticProps = async () => {
  // ver1. 직렬구조 (한 호출이 끝나야 다음 호출을 진행)
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  console.log('인덱스 페이지');

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
  // next에서 제공하는 타입으로 타입을 자동 추천해줌 (#1, #2 동일한 역할할)

  // console.log(allBooks);

  return (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
