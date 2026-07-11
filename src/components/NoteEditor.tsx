import { useAutoSave } from '../hooks/useAutoSave'
import type { Note, SaveStatus } from '../types'

interface NoteEditorProps {
  note: Note
  onUpdate: (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => void
  onBack: () => void
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null

  const styles = {
    saving: 'text-amber-600 dark:text-amber-400',
    saved: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
  }

  const labels = {
    saving: 'Saving...',
    saved: 'Saved \u2713',
    error: 'Error Saving',
  }

  return (
    <span className={`text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export function NoteEditor({ note, onUpdate, onBack }: NoteEditorProps) {
  const saveStatus = useAutoSave(note.id, note.title, note.content)

  const updatedAt = new Date(note.updated_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Last updated: {updatedAt}
          </span>
        </div>
        <SaveIndicator status={saveStatus} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onUpdate(note.id, { title: e.target.value })}
          placeholder="Note title..."
          className="px-6 pt-4 pb-2 text-lg font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-none outline-none placeholder-gray-400"
        />
        <textarea
          value={note.content}
          onChange={(e) => onUpdate(note.id, { content: e.target.value })}
          placeholder="Start writing..."
          className="flex-1 px-6 pb-4 text-sm text-gray-800 dark:text-gray-200 bg-transparent border-none outline-none resize-none placeholder-gray-400 leading-relaxed"
        />
      </div>
    </div>
  )
}
