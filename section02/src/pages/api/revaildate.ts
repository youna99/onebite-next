import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate('/'); // revalidate할 페이지경로
    return res.json({ revalidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Revalidation Failed');
  }
}
