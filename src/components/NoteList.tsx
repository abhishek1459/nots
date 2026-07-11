import type { Note } from '../types'
import { NoteCard } from './NoteCard'

interface NoteListProps {
  notes: Note[]
  selectedNoteId: string | null
  onSelect: (id: string) => void
  onPinToggle: (id: string, pinned: boolean) => void
  onCopy: (note: Note) => void
  onDelete: (id: string) => void
  loading: boolean
}

export function NoteList({
  notes,
  selectedNoteId,
  onSelect,
  onPinToggle,
  onCopy,
  onDelete,
  loading,
}: NoteListProps) {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          No notes yet. Click "New Note" to create one.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          selected={note.id === selectedNoteId}
          onSelect={() => onSelect(note.id)}
          onPinToggle={() => onPinToggle(note.id, note.pinned)}
          onCopy={() => onCopy(note)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  )
}
