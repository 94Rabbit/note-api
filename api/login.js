import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body
  const user = await kv.get(`user:${username}`)
  if (!user || user.password !== password) {
    return res.json({ code: 400, msg: '账号密码错误' })
  }
  return res.json({ code: 200, data: user })
}
