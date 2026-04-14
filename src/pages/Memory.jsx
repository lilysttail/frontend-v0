import React, { useState } from 'react'
import { searchMemory } from '../api.js'

export default function Memory() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  async function search(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const d = await searchMemory(query)
      setResults(d.results || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <h2 className="text-white/30 text-xs tracking-widest mb-6">记忆</h2>

      <form onSubmit={search} className="flex gap-3 mb-8">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索…"
          className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white/70 outline-none focus:border-white/25 placeholder-white/20 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-white/15 rounded text-sm text-white/50 hover:text-white/80 hover:border-white/25 transition-colors"
        >
          {loading ? '…' : '搜索'}
        </button>
      </form>

      {results !== null && (
        <div className="space-y-3">
          {results.length === 0 && (
            <p className="text-white/20 text-sm">没有找到相关内容</p>
          )}
          {results.map((r, i) => (
            <div key={i} className="border border-white/8 rounded px-4 py-3">
              <p className="text-white/70 text-sm">{r.title || '（无标题）'}</p>
              <p className="text-white/25 text-xs mt-1">{r.type} · {r.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
