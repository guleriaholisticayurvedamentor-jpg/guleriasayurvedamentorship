import { supabase } from '../lib/supabaseClient'

// Admin login
export const adminLogin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  // Check if user is admin
  const isAdmin = await checkAdminStatus(data.user.id)
  if (!isAdmin) {
    await supabase.auth.signOut()
    throw new Error('Unauthorized: Admin access only')
  }

  return data
}

// Admin logout
export const adminLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Check admin status
export const checkAdminStatus = async (userId) => {
  console.log('Checking admin status for user:', userId)
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .single()

  console.log('Admin check result:', { data, error })
  
  if (error) {
    console.error('Error checking admin status:', error)
    return false
  }
  
  const isAdmin = data?.role === 'admin'
  console.log('Is admin?', isAdmin, 'Role:', data?.role)
  
  return isAdmin
}

// Get current session
export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// Get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Subscribe to auth state changes
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}
