import React, { useState, useEffect } from 'react'
import { searchMemory } from '../api.js'

function MemoryCard({ item }) {
  const [expanded, setExpanded] = useState(false)

  function toggle() {
    setExpanded(v => !v)
  }

  const displayContent = item.full_content || item.excerpt || '（无内容）'

  const dateStr = (item.last_edited_time || item.created_time || '').slice(0, 10)

  return (
    <div
      className="border border-white/8 rounded px-4 py-3 cursor-pointer hover:border-white/18 transition-colors"
      onClick={toggle}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-white/70 text-sm font-medium leading-snug">{item.title}</p>
        <span className="text-white/20 text-xs shrink-0 mt-0.5">{expanded ? '收起' : '展开'}</span>
      </div>

      {item.excerpt && !expanded && (
        <p className="text-white/35 text-xs mt-1.5 line-clamp-2 leading-relaxed">{item.excerpt}</p>
      )}

      {dateStr && (
        <p className="text-white/18 text-xs mt-1.5">{dateStr}</p>
      )}

      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/8">
          <p className="text-white/60 text-sm whitespace-pre-wrap leading-relaxed">{displayContent}</p>
        </div>
      )}
    </div>
  )
}

export default function Memory() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    load('')
  }, [])

  async function load(q) {
    setLoading(true)
    setError(null)
    try {
      const d = await searchMemory(q)
      setResults(d.results || [])
    } catch (e) {
      setError(e.message || '搜索失败')
    } finally {
      setLoading(false)
    }
  }

  async function search(e) {
    e.preventDefault()
    load(query)
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

      {loading && results === null && (
        <p className="text-white/20 text-sm">加载中…</p>
      )}

      {error && (
        <p className="text-red-400/50 text-xs">{error}</p>
      )}

      {results !== null && (
        <div className="space-y-3">
          {results.length === 0 && (
            <p className="text-white/20 text-sm">没有找到相关内容</p>
          )}
          {results.map((r) => (
            <MemoryCard key={r.id} item={r} />
          ))}
        </div>
      )}
    </div>
  )
}
