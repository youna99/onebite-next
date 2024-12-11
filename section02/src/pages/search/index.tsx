import { useRouter } from 'next/router';

export default function Page() {
  // 라우터 객체 저장
  const router = useRouter();
  console.log(router);

  //   const q = router.query.q;
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}
