import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import DoorNote from '../components/DoorNote.jsx'
import { fetchStartup } from '../api.js'

export default function Launcher() {
  const [startup, setStartup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStartup()
      .then(setStartup)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex h-[calc(100vh-49px)]">
      {/* 左侧主区 */}
      <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
        {loading && (
          <p className="text-white/30 text-sm">读取中…</p>
        )}
        {error && (
          <p className="text-red-400/70 text-sm">获取失败：{error}</p>
        )}
        {startup && (
          <>
            <div className="mb-8">
              <p className="text-white/25 text-xs tracking-widest mb-1">{startup.date}</p>
              <h1 className="text-2xl font-light text-white/90">你好，陆。</h1>
            </div>

            {/* 当前状态 */}
            {startup.status_summary && (
              <Section title="当前状态">
                <p className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap">
                  {startup.status_summary}
                </p>
              </Section>
            )}

            {/* 门口纸条 */}
            <DoorNote
              doorNote={startup.door_note}
              onSaved={(content) => setStartup(s => ({ ...s, door_note: content }))}
            />

            {/* 最近经历 */}
            {startup.recent_memories?.length > 0 && (
              <Section title="最近经历">
                <ul className="space-y-2">
                  {startup.recent_memories.map((m, i) => (
                    <li key={i} className="text-white/55 text-sm leading-relaxed">{m}</li>
                  ))}
                </ul>
              </Section>
            )}

            {/* 进入对话 */}
            <div className="mt-10">
              <a
                href="https://claude.ai/new"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2.5 rounded border border-white/20 text-white/70 text-sm hover:bg-white/5 hover:text-white transition-colors"
              >
                进入对话 →
              </a>
            </div>
          </>
        )}
      </div>

      {/* 右侧边栏 */}
      <Sidebar startup={startup} loading={loading} />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-white/25 text-xs tracking-widest uppercase mb-2">{title}</p>
      {children}
    </div>
  )
}
