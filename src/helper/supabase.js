import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_LINK, import.meta.env.VITE_PUBLIC_KEY )

export async function signInWithEmail(email, password) {
  const message = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return message;
}

export async function signUpNewUser(email, password) {
  const message = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return message;
}