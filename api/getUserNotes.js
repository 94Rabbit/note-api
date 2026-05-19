import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { userId } = req.query
  const data = await kv.get(`notes:${userId}`) || []
  return res.json({ code: 200, data })
}
