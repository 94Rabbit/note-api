import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { userId, notes } = req.body
  await kv.set(`notes:${userId}`, notes)
  return res.json({ code: 200, msg: '同步成功' })
}
