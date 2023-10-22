// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Token = {
  amToken: string
}

type ErrorResponse = {
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token | ErrorResponse>
) {
  const token = process.env.AM_TOKEN as string;

  if (!token) {
    res.status(500).json({ error: 'Token not found' });
    return;
  }

  res.setHeader('Cache-Control', 'max-age=86400')
  res.status(200).json({ amToken: token });
}

