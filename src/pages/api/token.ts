// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Token = {
  amToken: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token>
) {
  const token = process.env.AM_TOKEN as string;

  if (!token) {
    res.status(500).json({ amToken: 'Token not found' });
    return;
  }

  res.status(200).json({ amToken: token });
}
