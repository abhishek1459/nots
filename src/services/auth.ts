import { supabase } from '../lib/supabase'

export async function signIn(username: string, password: string) {
  const email = `${username.toLowerCase()}@nots.app`
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUp(username: string, password: string) {
  const email = `${username.toLowerCase()}@nots.app`
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}

export function onAuthStateChange(callback: (user: unknown) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
  return data.subscription
}
