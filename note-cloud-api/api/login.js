import { JSONFilePreset } from 'lowdb/node'
const db = await JSONFilePreset('db.json', { users: [], notes: [] })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body
  const user = db.data.users.find(u => u.username === username && u.password === password)
  if (!user) return res.json({ code: 400, msg: '账号密码错误' })

  res.json({ code: 200, data: user })
}