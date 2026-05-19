import { JSONFilePreset } from 'lowdb/node'
const db = await JSONFilePreset('db.json', { users: [], notes: [] })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method !== 'GET') return res.status(405).end()

  const { userId } = req.query
  const list = db.data.notes.filter(n => n.userId == userId)
  res.json({ code: 200, data: list })
}