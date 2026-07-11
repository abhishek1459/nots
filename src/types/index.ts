export interface Note {
  id: string
  user_id: string
  title: string
  content: string
  pinned: boolean
  created_at: string
  updated_at: string
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
