import { supabase } from '../lib/supabase'
import type { Note } from '../types'

export async function getNotes(userId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('pinned', { ascending: false })
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createNote(userId: string): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .insert({ user_id: userId, title: '', content: '' })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateNote(
  id: string,
  updates: Partial<Pick<Note, 'title' | 'content' | 'pinned'>>
): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) throw error
}
