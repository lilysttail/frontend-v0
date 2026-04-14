import React from 'react'

export default function Sidebar({ startup, loading }) {
  return (
    <aside className="w-64 border-l border-white/10 px-5 py-8 overflow-y-auto shrink-0">
      {loading && <p className="text-white/20 text-xs">…</p>}
      {startup && (
        <div className="space-y-6">
          {/* 关于陆 */}
          {startup['核心页面']?.['关于陆'] && (
            <Block title="关于陆">
              {startup['核心页面']['关于陆']}
            </Block>
          )}

          {/* 关于卡卡 */}
          {startup['关于卡卡'] && (
            <Block title="关于卡卡">
              {startup['关于卡卡']}
            </Block>
          )}

          {/* 我们的约定 */}
          {startup['核心页面']?.['我们的约定'] && (
            <Block title="我们的约定">
              {startup['核心页面']['我们的约定']}
            </Block>
          )}

          {/* 有消息提示 */}
          {startup.has_message && (
            <div className="text-amber-400/70 text-xs border border-amber-400/20 rounded px-3 py-2">
              💌 {startup.message_excerpt || '卡卡有留言'}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

function Block({ title, children }) {
  return (
    <div>
      <p className="text-white/20 text-xs tracking-widest mb-1.5">{title}</p>
      <p className="text-white/45 text-xs leading-relaxed line-clamp-6">{children}</p>
    </div>
  )
}
