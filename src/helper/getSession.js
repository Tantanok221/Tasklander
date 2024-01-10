import {supabase} from "./supabase.js"

export const getSession = async () => {
  const data = await supabase.auth.getSession()
  return data
}
