// CSS Module
import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// 페이지 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터 불러오는 함수
// 사전 렌더링하는 과정에서 딱 한번만 실행되므로 오직 서버측에서만 실행되는 함수
export const getServerSideProps = async () => {
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
  };
};
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // next에서 제공하는 타입으로 타입을 자동 추천해줌

  console.log(allBooks);

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
