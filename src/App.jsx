import React, { useState } from 'react'
import Launcher from './pages/Launcher.jsx'
import MessageLog from './pages/MessageLog.jsx'
import Memory from './pages/Memory.jsx'

const TABS = [
  { id: 'home', label: '家' },
  { id: 'log', label: '记录' },
  { id: 'memory', label: '记忆' },
]

export default function App() {
  const [tab, setTab] = useState('home')

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <nav className="border-b border-white/10 px-6 py-3 flex items-center gap-6">
        <span className="text-white/30 text-sm tracking-widest">陆 · 家</span>
        <div className="flex gap-1 ml-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded text-sm transition-colors ${
                tab === t.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 内容区 */}
      <main className="flex-1">
        {tab === 'home' && <Launcher />}
        {tab === 'log' && <MessageLog />}
        {tab === 'memory' && <Memory />}
      </main>
    </div>
  )
}
