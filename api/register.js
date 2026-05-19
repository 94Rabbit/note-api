import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body
  const user = await kv.get(`user:${username}`)
  if (user) return res.json({ code: 400, msg: '账号已存在' })

  const userId = Date.now()
  await kv.set(`user:${username}`, { userId, username, password, isVip: 0 })
  return res.json({ code: 200, msg: '注册成功' })
}
