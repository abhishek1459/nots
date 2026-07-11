import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { NoteList } from '../components/NoteList'
import { NoteEditor } from '../components/NoteEditor'
import { Modal } from '../components/ui/Modal'
import { signOut, getCurrentUser } from '../services/auth'
import { getNotes, createNote, deleteNote, updateNote } from '../services/notes'
import type { Note } from '../types'

export function Dashboard() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [showMobileList, setShowMobileList] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nots-dark-mode') === 'true'
    }
    return false
  })
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [user, setUser] = useState<{ id: string } | null>(null)

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) {
        navigate('/login', { replace: true })
        return
      }
      setUser(u)
    })
  }, [navigate])

  useEffect(() => {
    if (!user) return
    getNotes(user.id).then(setNotes).catch(() => {}).finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('nots-dark-mode', String(darkMode))
  }, [darkMode])

  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    )
  })

  async function handleCreateNote() {
    try {
      const note = await createNote(user!.id)
      setNotes((prev) => [note, ...prev])
      setSelectedNoteId(note.id)
      setShowMobileList(false)
    } catch {
      // silent fail
    }
  }

  async function handleDeleteNote(id: string) {
    setDeleteConfirm(id)
  }

  async function confirmDelete() {
    if (!deleteConfirm) return
    try {
      await deleteNote(deleteConfirm)
      setNotes((prev) => prev.filter((n) => n.id !== deleteConfirm))
      if (selectedNoteId === deleteConfirm) {
        setSelectedNoteId(null)
      }
    } catch {
      // silent fail
    }
    setDeleteConfirm(null)
  }

  async function handlePinToggle(id: string, pinned: boolean) {
    try {
      await updateNote(id, { pinned: !pinned })
      setNotes((prev) => {
        const updated = prev.map((n) =>
          n.id === id ? { ...n, pinned: !pinned } : n
        )
        updated.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1
          if (!a.pinned && b.pinned) return 1
          return 0
        })
        return updated
      })
    } catch {
      // silent fail
    }
  }

  function handleCopy(note: Note) {
    const text = note.title
      ? `${note.title}\n\n${note.content}`
      : note.content
    navigator.clipboard.writeText(text).catch(() => {})
  }

  function handleUpdateNote(id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    )
  }

  const handleLogout = useCallback(async () => {
    await signOut()
    navigate('/login', { replace: true })
  }, [navigate])

  function handleSelectNote(id: string) {
    setSelectedNoteId(id)
    setShowMobileList(false)
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-950 ${
            showMobileList ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-3">
            <button
              onClick={handleCreateNote}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + New Note
            </button>
          </div>
          <NoteList
            notes={filteredNotes}
            selectedNoteId={selectedNoteId}
            onSelect={handleSelectNote}
            onPinToggle={handlePinToggle}
            onCopy={handleCopy}
            onDelete={handleDeleteNote}
            loading={loading}
          />
        </aside>

        <main
          className={`flex-1 flex flex-col bg-white dark:bg-gray-950 ${
            showMobileList ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onUpdate={handleUpdateNote}
              onBack={() => setShowMobileList(true)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Select a note or create a new one
              </p>
            </div>
          )}
        </main>
      </div>

      <Modal
        open={deleteConfirm !== null}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        destructive
      />
    </div>
  )
}
