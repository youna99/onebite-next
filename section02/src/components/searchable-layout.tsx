import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  // 쿼리스트링의 q값 저장
  const q = router.query.q as string;

  // q 값이 변하면 q 값이거나 빈값
  // 서치바에 검색어가 그대로 남아있게 하기 위함
  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // search값이 없거나 같은 검색어일 경우 페이지이동이 안일어나도록
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChageSearch}
          placeholder="검색어를 입력하세요!"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
