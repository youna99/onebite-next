import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Page() {
  // 라우터 객체 저장
  const router = useRouter();
  console.log(router);

  //   const q = router.query.q;
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
