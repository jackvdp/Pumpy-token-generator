// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Token = {
  amToken: string
}

export default function handler(
  res: NextApiResponse<Token>
) {
  res.status(200).json({ amToken: 'John Doe' })
}
