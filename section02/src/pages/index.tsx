// CSS Module
import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';

// 페이지 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터 불러오는 함수
// 사전 렌더링하는 과정에서 딱 한번만 실행되므로 오직 서버측에서만 실행되는 함수
export const getServerSideProps = () => {
  const data = 'hello';

  return {
    props: { data },
  };
};
export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // next에서 제공하는 타입으로 타입을 자동 추천해줌
  console.log(data);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
