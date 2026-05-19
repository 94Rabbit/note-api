import { JSONFilePreset } from 'lowdb/node'
const db = await JSONFilePreset('db.json', { users: [], notes: [] })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method !== 'POST') return res.status(405).end()

  const { userId, notes } = req.body
  db.data.notes = db.data.notes.filter(n => n.userId !== userId)
  notes.forEach(n => db.data.notes.push({ userId, ...n }))
  await db.write()
  res.json({ code: 200, msg: '同步成功' })
}