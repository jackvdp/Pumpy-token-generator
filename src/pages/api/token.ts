// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export type Token = {
  amToken: string
}

export type ErrorResponse = {
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

  let maxAge = getCacheTime(token)

  if (maxAge === null) {
    res.status(500).json({ error: 'Invalid token format' });
    return;
  }

  if (maxAge <= 0) {
    res.status(401).json({ error: 'Token has expired ' + token });
    return;
  }

  res.setHeader('Cache-Control', `max-age=${maxAge}`);
  res.status(200).json({ amToken: token });
}

export function getCacheTime(jwtToken: string): number | null  {
  const decodedToken = jwt.decode(jwtToken) as { exp?: number };

  if (!decodedToken || !decodedToken.exp) {
    return null
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const maxAge = decodedToken.exp - currentTimeInSeconds
  return maxAge
}

