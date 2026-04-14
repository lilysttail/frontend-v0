import React, { useState } from 'react'
import { writeDoorNote } from '../api.js'

export default function DoorNote({ doorNote, onSaved }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function startEdit() {
    setDraft(doorNote || '')
    setEditing(true)
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    try {
      await writeDoorNote(draft)
      setSaved(true)
      setEditing(false)
      onSaved?.(draft)
    } catch {
      // 失败静默，不弹错误
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mb-6">
      <p className="text-white/25 text-xs tracking-widest uppercase mb-2">门口纸条</p>

      {!editing ? (
        <div
          onClick={startEdit}
          className="cursor-pointer rounded border border-white/10 px-4 py-3 hover:border-white/20 transition-colors group"
        >
          {doorNote ? (
            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">{doorNote}</p>
          ) : (
            <p className="text-white/20 text-sm italic">还没有纸条，点击留一张</p>
          )}
          {saved && (
            <p className="text-green-400/50 text-xs mt-2">已保存</p>
          )}
        </div>
      ) : (
        <div className="rounded border border-white/20 px-4 py-3 bg-white/[0.02]">
          <textarea
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
            className="w-full bg-transparent text-white/70 text-sm leading-relaxed resize-none outline-none placeholder-white/20"
            placeholder="给陆留一张纸条…"
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={save}
              disabled={saving}
              className="text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              {saving ? '保存中…' : '保存'}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
