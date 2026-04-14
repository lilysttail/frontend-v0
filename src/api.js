const BASE = 'https://notionlu.zeabur.app'

export async function fetchStartup() {
  const r = await fetch(`${BASE}/startup`)
  if (!r.ok) throw new Error('startup 获取失败')
  return r.json()
}

export async function fetchMessageLog(limit = 20) {
  const r = await fetch(`${BASE}/message-log/recent?limit=${limit}`)
  if (!r.ok) throw new Error('message_log 获取失败')
  return r.json()
}

export async function searchMemory(query) {
  const r = await fetch(`${BASE}/notion/read`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'search', params_json: JSON.stringify({ query, filter: 'page' }) }),
  })
  if (!r.ok) throw new Error('记忆搜索失败')
  return r.json()
}

export async function fetchDoorNote() {
  const r = await fetch(`${BASE}/door-note`)
  if (!r.ok) throw new Error('门口纸条读取失败')
  return r.json()
}

export async function writeDoorNote(content) {
  const r = await fetch(`${BASE}/door-note`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!r.ok) throw new Error('门口纸条写入失败')
  return r.json()
}
