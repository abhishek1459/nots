import type { Note } from '../types'

interface NoteCardProps {
  note: Note
  selected: boolean
  onSelect: () => void
  onPinToggle: () => void
  onCopy: () => void
  onDelete: () => void
}

export function NoteCard({
  note,
  selected,
  onSelect,
  onPinToggle,
  onCopy,
  onDelete,
}: NoteCardProps) {
  const preview = note.content
    .replace(/\n/g, ' ')
    .substring(0, 120)
  const hasPreview = preview.length > 0

  return (
    <div
      onClick={onSelect}
      className={`group relative p-3 rounded-lg cursor-pointer border transition-colors ${
        selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-600'
          : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate flex-1">
          {note.title || 'Untitled'}
        </h3>
        <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onPinToggle() }}
            className={`p-1.5 sm:p-1 rounded transition-colors ${
              note.pinned
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title={note.pinned ? 'Unpin' : 'Pin'}
          >
            <svg className="w-5 h-5 sm:w-3.5 sm:h-3.5" fill={note.pinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 3.75v12.75l-3.75 2.25-3.75-2.25V3.75h7.5z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCopy() }}
            className="p-1.5 sm:p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Copy note"
          >
            <svg className="w-5 h-5 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="p-1.5 sm:p-1 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete note"
          >
            <svg className="w-5 h-5 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      {hasPreview && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {preview}
        </p>
      )}
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
        {formatTime(note.updated_at)}
      </p>
    </div>
  )
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
