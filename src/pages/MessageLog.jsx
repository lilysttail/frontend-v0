import React, { useEffect, useState } from 'react'
import { fetchMessageLog } from '../api.js'

const ROLE_LABEL = {
  user: '卡卡',
  ai: '陆',
  proactive_ai: '陆（主动）',
  system: '系统',
}

const ROLE_COLOR = {
  user: 'text-sky-300/70',
  ai: 'text-emerald-300/70',
  proactive_ai: 'text-violet-300/70',
  system: 'text-white/30',
}

export default function MessageLog() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessageLog(30)
      .then(d => setRecords(d.records || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <h2 className="text-white/30 text-xs tracking-widest mb-6">消息记录</h2>

      {loading && <p className="text-white/20 text-sm">读取中…</p>}

      <div className="space-y-4">
        {records.map((r, i) => (
          <div key={i} className="border-b border-white/5 pb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-xs font-medium ${ROLE_COLOR[r.role] || 'text-white/40'}`}>
                {ROLE_LABEL[r.role] || r.role}
              </span>
              <span className="text-white/20 text-xs">{fmt(r.created_at)}</span>
              {r.source && r.source !== 'claude_web' && (
                <span className="text-white/15 text-xs">{r.source}</span>
              )}
            </div>
            <p className="text-white/55 text-sm leading-relaxed whitespace-pre-wrap">
              {r.raw_natural_content || r.content}
            </p>
          </div>
        ))}

        {!loading && records.length === 0 && (
          <p className="text-white/20 text-sm">还没有记录</p>
        )}
      </div>
    </div>
  )
}

function fmt(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('zh-CN', {
      month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
}
