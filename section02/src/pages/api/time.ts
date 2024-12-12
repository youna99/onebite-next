// Next에서 타입을 불러와 사용함
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date(); // 현재 시간을 보관하는 새로운 Date 객체
  res.json({ time: date.toLocaleString() });
}
