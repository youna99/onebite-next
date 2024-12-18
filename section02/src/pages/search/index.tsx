import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import { BookData } from '@/types';

// #1. SSR
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   console.log(context);
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

// #2. SSR(정적 경로)
// SSR에서는 query을 꺼내서 사용할 수 없다
// 빌드 시점에 쿼리스트링을 알 수 없기 때문
// 따라서 getStaticProps 방식(서버)이 아닌 클라이언트측에서 직접 진행해야함

// #1. SSR
// export default function Page({
//   books,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div>
//       {books.map((book) => (
//         <BookItem key={book.id} {...book} />
//       ))}
//     </div>
//   );
// }

// #2. SSG
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
