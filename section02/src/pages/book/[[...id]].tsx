import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  //   console.log(router);
  const { id } = router.query;
  console.log(id); // 배열로 저장

  return <h1>Book {id}</h1>;
}
