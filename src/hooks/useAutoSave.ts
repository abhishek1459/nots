import { useEffect, useRef, useState } from 'react'
import { updateNote } from '../services/notes'
import type { SaveStatus } from '../types'

export function useAutoSave(
  noteId: string | null,
  title: string,
  content: string
) {
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSavedRef = useRef({ title: '', content: '', noteId: null as string | null })

  useEffect(() => {
    if (!noteId) {
      setStatus('idle')
      return
    }

    if (lastSavedRef.current.noteId !== noteId) {
      lastSavedRef.current = { title, content, noteId }
      setStatus('idle')
      return
    }

    if (
      lastSavedRef.current.title === title &&
      lastSavedRef.current.content === content
    ) {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setStatus('saving')

    timeoutRef.current = setTimeout(async () => {
      try {
        await updateNote(noteId, { title, content })
        lastSavedRef.current = { title, content, noteId }
        setStatus('saved')
      } catch {
        setStatus('error')
      }
    }, 1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [noteId, title, content])

  return status
}
