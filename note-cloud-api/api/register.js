import { JSONFilePreset } from 'lowdb/node'
const db = await JSONFilePreset('db.json', { users: [], notes: [] })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body
  if (db.data.users.find(u => u.username === username)) {
    return res.json({ code: 400, msg: '账号已存在' })
  }
  db.data.users.push({ userId: Date.now(), username, password, isVip: 0 })
  await db.write()
  res.json({ code: 200, msg: '注册成功' })
}